package config

import "os"

type Config struct {
	ExternalIp       string
	InternalIpPattern string
	ConfigPath       string
}

func getConfigFromEnv() *Config {
	externalIp := os.Getenv("EXTERNAL_IP")
	internalIpPattern := os.Getenv("INTERNAL_IP_PATTERN")
	configPath := os.Getenv("CONFIG_PATH")

	if externalIp == "" {
		panic("Please set 'EXTERNAL_IP' environment variable")
	}
	if internalIpPattern == "" {
		panic("Please set 'INTERNAL_IP_PATTERN' environment variable")
	}
	if configPath == "" {
		configPath = "/etc/nginx/conf.d/default.conf"
	}

	return &Config{
		ExternalIp:       externalIp,
		InternalIpPattern: internalIpPattern,
		ConfigPath:       configPath,
	}
}
