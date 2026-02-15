package main

import (
	"shared-nginx-configurator/pkg/config"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.CreateConfigFromDocker()
}
