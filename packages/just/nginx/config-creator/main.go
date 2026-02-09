package main

import (
	"github.com/joho/godotenv"
	"gitlab.justinkonratt.de/just-nginx-config-creator/pkg/config"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	config.CreateConfigFromDocker()
}
