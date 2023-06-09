# Overview

This project contains multiple services:

```mermaid
graph LR
  %% init services

  admin-frontend("admin-frontend<br/>(t3, ChakraUI)")

  auth-frontend("auth-frontend<br/>(nextjs, tailwind)")
  auth-provider("auth-provider<br/>(supertokens)")

  backup-service("backup-service<br/>(rsnapshot + nodejs, fastify)<br/>pc, server, notion, drive")

  documentation("documentation<br/>(VitePress, Mermaid)")

  finance-system("finance-system<br/>(react, tailwind)")
  finance-system-db("finance-system-db<br/>(postgresSQL)")
  finance-system-strapi("finance-system-strapi<br/>(strapi)")

  health("health<br/>(healthchecks.io)")

  music("music<br/>(navidrome)")
  music-services("music-services<br/>(nodejs, fastify)<br/>auto download & playlists")

  reverse-proxy("reverse-proxy<br/>(nginx)")

  utils("utils<br/>(nodejs, fastify)<br/>random strings/passwords")

  %% connections

  subgraph proxy
    reverse-proxy
  end

  subgraph authentication
    reverse-proxy --> auth-frontend
    auth-frontend --> auth-provider
    auth-provider --> reverse-proxy
  end

  reverse-proxy

  subgraph authenticated
    reverse-proxy -->|sec-admin| admin-frontend
    reverse-proxy -->|sec-admin| documentation
    reverse-proxy -->|sec?| finance-system
    reverse-proxy -->|sec-admin| health
    reverse-proxy -->|sec| music

    admin-frontend --> music-services
    admin-frontend --> backup-service
    admin-frontend --> utils

    finance-system --> finance-system-strapi
    finance-system-strapi --> finance-system-db
  end
```

<button type="button" class="custom-button" @click="fullscreen">Fullscreen</button>

<script setup>import {useData} from "vitepress";

const { isDark } = useData();

const fullscreen = () => {
    const mermaid = document.querySelector("div > svg");
    mermaid.style["background-color"] = isDark.value ? "#1e1e20" : "white";
    mermaid.requestFullscreen();
};
</script>

## Structure

Each folder of the root directory contains a service, or it's configuration.
There won't be much documentation via `README` files because each service is or will be documented
here.

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

### Dev Containers

To develop inside containers, the service directories are mounted to the containers.
> :warning: The `node_modules` folder must always be a volumes (preferably an anonymous one)
> to prevent packages being incompatible with the system.

For more specific information about a service, please refer to the following service pages.

## .gitignore

The `.gitignore` file contains general exports for the whole project.
They are used in all subdirectories.
