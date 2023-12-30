# Overview

This project contains multiple services:

```mermaid
graph LR
  %% init services

  auth("auth<br/>(keycloak)")
  backup-service("backup-service<br/>(rsnapshot)")
  bitwarden("bitwarden<br/>(vaultwarden)")
  dashboard("dashboard<br/>(dashy)")
  db("db<br/>(postgres)")
  docker-registry
  documentation("documentation<br/>(VitePress)")
  doku
  gitlab
  gitlab-runner
  grafana
  linkstack("linkstack<br/>own authentication")
  music("music<br/>(Navidrome)")
  music-downloader("music-downloader<br/>(nextjs, yt-dlp)")
  netdata
  nginx
  portainer
  prometheus
  scoreboard("scoreboard<br/>(nextjs, notion)")
  sonarqube
  tunnel("tunnel<br/>(cloudflared)")

  %% connections

  subgraph proxy
    nginx
  end

  subgraph public
    nginx --> auth
    nginx --> bitwarden
    nginx --> linkstack
  end

  subgraph proxy-authenticated
    nginx --> documentation
    nginx --> music
    nginx --> music-downloader
    nginx --> dashboard
    nginx --> doku
    nginx --> netdata
    nginx --> prometheus
  end

  subgraph authenticated
    docker-registry <--> auth
    nginx --> docker-registry
    gitlab <--> auth
    nginx --> gitlab
    grafana <--> auth
    nginx --> grafana
    portainer <--> auth
    nginx --> portainer
    scoreboard <--> auth
    nginx --> scoreboard
    sonarqube <--> auth
    nginx --> sonarqube
  end

  subgraph standalone
    backup-service
  end

  db <--> auth
  db <--> scoreboard
  db <--> sonarqube

  gitlab-runner <--> gitlab
  tunnel <--> nginx
```

<button type="button" class="custom-button" @click="fullscreen">Fullscreen</button>

<script setup>import {useData} from "vitepress";

const { isDark } = useData();

const fullscreen = () => {
    const mermaid = document.querySelector("main div > svg");
    mermaid.style["background-color"] = isDark.value ? "#1e1e20" : "white";
    mermaid.requestFullscreen();
};
</script>

## Environment

The root directory contains a `.env.template` file which contains all possible environment
variables you can set. Specify them as you want inside the `.env` file.

In most cases there are three variables for each service:

- `{SERVICE}_CONTAINER_NAME={SERVICE}`
- `{SERVICE}_PORT=8080`
- `{SERVICE}_BASE_PATH=/{SERVICE}`

They are used to configure the services inside the docker compose configuration and reverse proxy
settings and for the service-containers themselves to avoid duplicated configurations.

## Docker Compose

This project is set up with `docker compose`. Docker compose is used for development, testing,
and deployment. The `docker-compose.yml` contains all the necessary configuration.

> :warning: Please notice, that since we are using a reverse proxy to reach services, ports (except of
> dev-containers) must not be exposed.
