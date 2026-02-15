package config

import (
	"fmt"
	"maps"
	"slices"
	"strings"
)

var (
	truthy = []string{"true", "1", "yes", "y", "on"}
	falsy  = []string{"false", "0", "no", "n", "off"}
)

type LabelContext struct {
	value         string
	args          []string
	luaAccessFile string
}

type Label struct {
	key   string
	order int
}

type LabelHandler struct {
	key     string
	order   int
	handler func(ctx LabelContext) (NginxBlock, error)
}

var highLevelLabels = []Label{
	{key: "proto", order: 0},
	{key: "host", order: 1},
	{key: "port", order: 2},
	{key: "luaAccessFile", order: 3},
	{key: "location", order: 12},
}

var labelHandlers = []LabelHandler{
	{
		key:   "domain",
		order: 4,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			return NginxBlock{content: "server_name " + ctx.value}, nil
		},
	},
	{
		key:   "isInternal",
		order: 5,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			if slices.Contains(truthy, ctx.value) {
				return NginxBlock{
					content: "if ($is_private_ip = false)", subBlocks: NginxBlocks{
						{content: "return 403"},
					},
				}, nil
			}
			return NginxBlock{}, nil
		},
	},
	{
		key:   "requiredRole",
		order: 6,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			return NginxBlock{content: "set $required_role " + ctx.value}, nil
		},
	},
	{
		key:   "useLuaAccess",
		order: 7,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			if ctx.luaAccessFile == "" {
				return NginxBlock{}, fmt.Errorf("Please set 'luaAccessFile' label before using 'useLuaAccess' label")
			}

			if slices.Contains(truthy, ctx.value) {
				return NginxBlock{content: "access_by_lua_file /etc/nginx/lua/" + ctx.luaAccessFile}, nil
			}

			return NginxBlock{}, nil
		},
	},
	{
		key:   "maxBodySize",
		order: 8,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			return NginxBlock{content: "client_max_body_size " + ctx.value}, nil
		},
	},
	{
		key:   "proxyHeaders",
		order: 9,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			if len(ctx.args) != 1 {
				return NginxBlock{}, fmt.Errorf("proxyHeaders must have one argument [header]")
			}
			return NginxBlock{content: "proxy_set_header " + ctx.args[0] + " " + ctx.value}, nil
		},
	},
	{
		key:   "proxyBuffering",
		order: 10,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			if slices.Contains(falsy, ctx.value) {
				return NginxBlock{content: "proxy_buffering off"}, nil
			}

			return NginxBlock{}, nil
		},
	},
	{
		key:   "gzip",
		order: 11,
		handler: func(ctx LabelContext) (NginxBlock, error) {
			if slices.Contains(falsy, ctx.value) {
				return NginxBlock{content: "gzip off"}, nil
			}
			return NginxBlock{}, nil
		},
	},
}

var handlerMap = makeHandlerMap()

func makeHandlerMap() map[string]LabelHandler {
	handlers := make(map[string]LabelHandler)
	for _, handler := range labelHandlers {
		handlers[handler.key] = handler
	}
	return handlers
}

var labelOrders = makeOrders(highLevelLabels, labelHandlers)

func makeOrders(highLevelLabels []Label, labelHandlers []LabelHandler) map[string]int {
	orders := make(map[string]int)
	for _, label := range highLevelLabels {
		orders[label.key] = label.order
	}
	for _, label := range labelHandlers {
		orders[label.key] = label.order
	}
	return orders
}

func totalLabelOrder(label string) int {
	totalOrder := 0
	for _, labelPart := range strings.Split(label, ".") {
		totalOrder += labelOrders[labelPart]
	}
	return totalOrder
}

func sortByLabelOrder[T any](m map[string]T) []string {
	keys := slices.Collect(maps.Keys(m))
	slices.SortFunc(keys, func(s1 string, s2 string) int {
		return totalLabelOrder(s1) - totalLabelOrder(s2)
	})
	return keys
}
