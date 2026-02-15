package config

import (
	"fmt"
	"log/slog"
	"os"
	"slices"
	"strings"
	"time"

	"shared-nginx-configurator/pkg/watcher"

	"github.com/bep/debounce"
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
		debounced(func() {
			err := createNginxConfig(config, containers)
			if err != nil {
				slog.Error("Failed to create nginx config", "error", err)
			}
		})
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
	gotNames := make(map[string]bool)
	for _, container := range containers {
		if gotNames[container.Name] {
			continue
		}
		blocks = append(blocks, createNginxServers(config, container)...)
		gotNames[container.Name] = true
	}

	return blocks
}

func createInitialBlocks(config *Config) NginxBlocks {
	blocks := NginxBlocks{}

	domain := config.LetsEncryptDomain
	if domain != "" {
		blocks = append(blocks, NginxBlocks{
			{content: "ssl_certificate /etc/letsencrypt/live/" + domain + "/fullchain.pem"},
			{content: "ssl_certificate_key /etc/letsencrypt/live/" + domain + "/privkey.pem"},
		}...)
	}

	if config.InternalIpPattern != "" {
		internalSubBlocks := NginxBlocks{{content: "default false"}}
		if config.ExternalIps != nil {
			for _, externalIp := range config.ExternalIps {
				internalSubBlocks = append(internalSubBlocks, NginxBlock{content: externalIp + " false"})
			}
		}

		internalSubBlocks = append(
			internalSubBlocks,
			NginxBlock{content: config.InternalIpPattern + " true"},
		)

		blocks = append(blocks, NginxBlocks{
			{content: "map $remote_addr $is_private_ip", subBlocks: internalSubBlocks},
		}...)
	}

	return blocks
}

func createNginxServers(config *Config, container watcher.NginxContainer) NginxBlocks {
	serverLabels := collectServerLabels(container.Labels)
	serverBlocks := make(NginxBlocks, 0, len(serverLabels))
	for _, labels := range(serverLabels) {
		serverBlocks = append(serverBlocks, createNginxServer(config, container.Name, labels))
	}

	return serverBlocks
}

func collectServerLabels(containerLabels map[string]string) map[string]map[string]string {
	commonLabels := make(map[string]string)
	servers := make(map[string]map[string]string)
	for key, value := range(containerLabels) {
		if !strings.HasPrefix(key, "nginx.") {
			continue
		}

		if strings.HasPrefix(key, "nginx.server") {
			parts := strings.Split(key, ".")[2:]
			server := parts[0]
			label := strings.Join(parts[1:], ".")

			if _, has := servers[server]; !has {
				servers[server] = make(map[string]string)
			}

			servers[server][label] = value
		} else {
			commonLabels[key] = value
		}
	}

	if len(servers) == 0 {
		servers["default"] = make(map[string]string)
	}

	for _, labels := range(servers) {
		for key, value := range(commonLabels) {
			labels[key] = value
		}
	}

	return servers
}

func createNginxServer(config *Config, containerName string, labels map[string]string) NginxBlock {
	serverBlock := NginxBlock{
		content: "server",
		subBlocks: NginxBlocks{
			{content: "listen 443 ssl"},
			{content: "listen [::]:443 ssl"},
			{content: "http2 on"},
		},
	}

	if _, has := labels["nginx.domain"]; !has {
		if config.Domain == "" {
			panic("Please set 'DOMAIN' when inferring 'nginx.domain'")
		}

		serverBlock.subBlocks = append(
			serverBlock.subBlocks,
			NginxBlock{content: "server_name " + containerName + "." + config.Domain},
		)
	}

	upstream := Upstream{proto: "http", host: containerName, port: "80"}
	luaAccessFile := "/etc/nginx/lua/access.lua"

	locations := make(map[string]map[string]string)
	locations["/"] = make(map[string]string)

	slog.Info("Creating nginx server block", "labels", labels)
	needsAuthCallbackLocation := false
	for _, key := range sortByLabelOrder(labels) {
		value := labels[key]
		keyParts := strings.Split(key, ".")[1:]
		key := keyParts[0]
		args := keyParts[1:]

		if strings.Contains(key, "useLuaAccess") {
			needsAuthCallbackLocation = true
		}

		switch key {
		case "proto":
			upstream.proto = value
		case "host":
			upstream.host = value
		case "port":
			upstream.port = value
		case "luaAccessFile":
			luaAccessFile = value
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

	if needsAuthCallbackLocation {
		locations["/callback-auth"] = make(map[string]string)
		authCallback := locations["/callback-auth"]
		authCallback["useLuaAccess"] = "true"
		authCallback["pass"] = "false"
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
	for _, key := range sortByLabelOrder(labels) {
		value := labels[key]
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
	handler, exists := handlerMap[key]
	if !exists {
		slog.Error("Unknown nginx label ignored", "key", key)
		return NginxBlock{}
	}

	ctx := LabelContext{
		value:         value,
		args:          args,
		luaAccessFile: luaAccessFile,
	}

	block, err := handler.handler(ctx)
	if err != nil {
		slog.Error("Label processing failed", "key", key, "error", err)
		return NginxBlock{}
	}

	return block
}
