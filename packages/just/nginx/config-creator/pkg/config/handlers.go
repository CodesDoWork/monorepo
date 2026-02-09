package config

import (
	"fmt"
	"slices"
)

var (
	truthy = []string{"true", "1", "yes", "y", "on"}
	falsy  = []string{"false", "0", "no", "n", "off"}
)

type LabelContext struct {
	value string
	args []string
	luaAccessFile string
}

type Handler func(ctx LabelContext) (NginxBlock, error)

var handlers = map[string]Handler{
	"domain": func(ctx LabelContext) (NginxBlock, error) {
		return NginxBlock{content: "server_name " + ctx.value}, nil
	},

	"maxBodySize": func(ctx LabelContext) (NginxBlock, error) {
		return NginxBlock{content: "client_max_body_size " + ctx.value}, nil
	},

	"proxyHeaders": func(ctx LabelContext) (NginxBlock, error) {
		if len(ctx.args) != 1 {
			return NginxBlock{}, fmt.Errorf("proxyHeaders must have one argument [header]")
		}
		return NginxBlock{content: "proxy_set_header " + ctx.args[0] + " " + ctx.value}, nil
	},

	"gzip": func(ctx LabelContext) (NginxBlock, error) {
		if slices.Contains(falsy, ctx.value) {
			return NginxBlock{content: "gzip off"}, nil
		}
		return NginxBlock{}, nil
	},

	"isInternal": func(ctx LabelContext) (NginxBlock, error) {
		if slices.Contains(truthy, ctx.value) {
			return NginxBlock{
				content: "if ($is_private_ip = false)", subBlocks: NginxBlocks{
					{content: "return 403"},
				},
			}, nil
		}
		return NginxBlock{}, nil
	},

	"requiredRole": func(ctx LabelContext) (NginxBlock, error) {
		return NginxBlock{content: "set $required_role " + ctx.value}, nil
	},

	"useLuaAccess": func(ctx LabelContext) (NginxBlock, error) {
		if ctx.luaAccessFile == "" {
			return NginxBlock{}, fmt.Errorf("Please set 'luaAccessFile' label before using 'useLuaAccess' label")
		}

		if slices.Contains(truthy, ctx.value) {
			return NginxBlock{content: "access_by_lua_file /etc/nginx/lua/" + ctx.luaAccessFile}, nil
		}
		
		return NginxBlock{}, nil
	},
}

