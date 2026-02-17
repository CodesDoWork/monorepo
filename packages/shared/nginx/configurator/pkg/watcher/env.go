package watcher

import "os"

type Config struct {
	DockerStack string
}

func getConfigFromEnv() *Config {
	dockerStack := os.Getenv("DOCKER_STACK")

	return &Config{DockerStack: dockerStack}
}
