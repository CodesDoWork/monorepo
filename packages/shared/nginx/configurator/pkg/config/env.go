package config

import (
	"os"
	"strings"
)

type Config struct {
	ConfigPath        string
	ExternalIps       []string
	InternalIpPattern string
	LetsEncryptDomain string
	Domain            string
}

func getConfigFromEnv() *Config {
	configPath := os.Getenv("CONFIG_PATH")
	externalIps := os.Getenv("EXTERNAL_IPS")
	internalIpPrefix := os.Getenv("INTERNAL_IP_PREFIX")
	letsEncryptDomain := os.Getenv("LETSENCRYPT_DOMAIN")
	domain := os.Getenv("DOMAIN")

	if configPath == "" {
		configPath = "/etc/nginx/conf.d/default.conf"
	}
	if externalIps != "" {
		if internalIpPrefix == "" {
			panic("Please set 'INTERNAL_IP_PREFIX' when using 'EXTERNAL_IPS'.")
		}
	}

	if internalIpPrefix != "" {
		internalIpPrefix = "~^" + strings.ReplaceAll(internalIpPrefix, ".", "\\.")
	}

	return &Config{
		ExternalIps:       strings.Split(externalIps, ","),
		InternalIpPattern: internalIpPrefix,
		ConfigPath:        configPath,
		LetsEncryptDomain: letsEncryptDomain,
		Domain:            domain,
	}
}
