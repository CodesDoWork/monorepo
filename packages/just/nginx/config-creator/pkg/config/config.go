package config

import (
	"fmt"
	"log/slog"
	"os"
	"slices"
	"strings"
	"time"

	"github.com/bep/debounce"
	"gitlab.justinkonratt.de/just-nginx-config-creator/pkg/watcher"
)

type Upstream struct {
	proto string
	host  string
	port  string
}

func CreateConfigFromDocker() {
	config := getConfigFromEnv()
	debounced := debounce.New(3 * time.Second)

	onContainers := make(chan map[string]watcher.NginxContainer)
	go watcher.WatchContainers(onContainers)
	for {
		containers := <-onContainers
		debounced(func() { createNginxConfig(config, containers) })
	}
}

func createNginxConfig(config *Config, containers map[string]watcher.NginxContainer) error {
	slog.Info("Creating Nginx Config", "containers", containers)
	blocks := getNginxBlocks(config, containers)
	
	err := os.WriteFile(config.ConfigPath, []byte(blocks.String((0))), 0644)
	if err != nil {
		return fmt.Errorf("Failed to write nginx config file: %s", err)
	} 
	
	slog.Info("Wrote nginx config file")
	return reloadNginx()
}

func getNginxBlocks(config *Config, containers map[string]watcher.NginxContainer) NginxBlocks {
	blocks := createInitialBlocks(config)
	for _, container := range containers {
		blocks = append(blocks, createNginxServer(container))
	}

	return blocks
}

func createInitialBlocks(config *Config) NginxBlocks {
	return NginxBlocks{
		{content: "map $remote_addr $is_private_ip", subBlocks: NginxBlocks{
			{content: "default false"},
			{content: config.ExternalIp + " false"},
			{content: config.InternalIpPattern + " true"},
		}},
	}
}

func createNginxServer(container watcher.NginxContainer) NginxBlock {
	serverBlock := NginxBlock{
		content: "server",
		subBlocks: NginxBlocks{
			{content: "listen 443 ssl"},
			{content: "listen [::]:443 ssl"},
			{content: "http2 on"},
		},
	}

	upstream := Upstream{proto: "http", host: container.Name, port: "80"}
	luaAccessFile := ""

	locations := make(map[string]map[string]string)
	locations["/"] = make(map[string]string)

	slog.Info("Creating nginx server block", "labels", container.Labels)
	for _, key := range sortedKeys(container.Labels) {
		value := container.Labels[key]
		keyParts := strings.Split(key, ".")[1:]
		key := keyParts[0]
		args := keyParts[1:]

		switch key {
		case "proto":
			upstream.proto = value
		case "host":
			upstream.host = value
		case "port":
			upstream.port = value
		case "luaAccessFile":
			luaAccessFile = value
			locations["/callback-auth"] = make(map[string]string)
			authCallback := locations["/callback-auth"]
			authCallback["useLuaAccess"] = "true"
			authCallback["pass"] = "false"
		case "location":
			locationPath := args[0]
			locationArgs := strings.Join(args[1:], ".")
			if locations[locationPath] == nil {
				locations[locationPath] = make(map[string]string)
			}
			locations[locationPath][locationArgs] = value
		default:
			serverBlock.subBlocks = append(
				serverBlock.subBlocks,
				blockFromKey(key, value, luaAccessFile, args...),
			)
		}
	}

	for _, path := range sortedKeysByLength(locations) {
		serverBlock.subBlocks = append(
			serverBlock.subBlocks,
			createNginxLocationBlock(path, locations[path], upstream, luaAccessFile),
		)
	}

	return serverBlock
}

func createNginxLocationBlock(
	path string,
	labels map[string]string,
	upstream Upstream,
	luaAccessFile string,
) NginxBlock {
	locationBlock := NginxBlock{content: "location " + path, subBlocks: NginxBlocks{}}

	addPass := true
	for key, value := range labels {
		keyParts := strings.Split(key, ".")
		key := keyParts[0]
		args := keyParts[1:]

		if key == "pass" {
			if slices.Contains(falsy, value) {
				addPass = false
			}
		} else {
			locationBlock.subBlocks = append(
				locationBlock.subBlocks,
				blockFromKey(key, value, luaAccessFile, args...),
			)
		}
	}

	if addPass {
		locationBlock.subBlocks = append(
			locationBlock.subBlocks,
			NginxBlock{
				content: "proxy_pass " + upstream.proto + "://" + upstream.host + ":" + upstream.port,
			},
		)
	}

	return locationBlock
}

func blockFromKey(key string, value string, luaAccessFile string, args ...string) NginxBlock {
	handler, exists := handlers[key]
    if !exists {
        slog.Error("Unknown nginx label ignored", "key", key)
        return NginxBlock{}
    }

    ctx := LabelContext{
        value:         value,
        args:          args,
        luaAccessFile: luaAccessFile,
    }

    block, err := handler(ctx)
    if err != nil {
        slog.Error("Label processing failed", "key", key, "error", err)
        return NginxBlock{}
    }

    return block
}
