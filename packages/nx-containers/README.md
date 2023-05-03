# nx-containers

Generates Dockerfiles and provides build commands to containerize your apps fast and easily.

## Installation

Universal with [ni](https://github.com/antfu/ni):

```shell
ni @codesdowork/nx-containers
```

With npm:

```shell
npm i @codesdowork/nx-containers
```

With yarn:

```shell
yarn add @codesdowork/nx-containers
```

With pnpm:

```shell
pnpm add @codesdowork/nx-containers
```

## How to use

### Generators

The following generator types are available:

- [workspace](#workspace)
- [apps](#apps)
  - [node](#node)
  - [nginx](#nginx)

#### Workspace

This generator creates a `Dockerfile` for your workspace including a `base.Dockerfile` to extend
other images from.

```shell
nx g @codesdowork/nx-containers:workspace [-o <organization>] [-V <nodeVersion>]
```

##### Options

| Name         | Description                                    | alias | default   |
| ------------ | ---------------------------------------------- | ----- | --------- |
| organization | Organization is used as prefix for image names | o     | undefined |
| nodeVersion  | Version of node-alpine docker image            | V     | 20        |

#### Apps

The following generators create `Dockerfile`s for your apps.
The `Dockerfile`s extend from base and workspace to keep things simple and clean.
A `build-container` target is automatically added to the `project.json` configuration.
If you choose to use docker compose, the app is added as a service to the `docker-compose.yml` file.

> Generators also run the workspace generator if no Dockerfile exists inside the root directory.

#### Node

Creates a Dockerfile for your node app.

```shell
nx g @codesdowork/nx-containers:node <appName> [-o <organization>] [-c] [-v <nodeVersion>]
```

##### Options

| Name          | Description                                                                     | alias | default   |
| ------------- | ------------------------------------------------------------------------------- | ----- | --------- |
| appName       | Name of the app you want to containerize                                        | -     | undefined |
| organization  | Organization is used as prefix for image names                                  | o     | undefined |
| dockerCompose | Specify whether dockerCompose is used                                           | C     | undefined |
| nodeVersion   | Version of node-alpine docker image (only used when workspace generator is run) | V     | 20        |

#### Nginx

Creates a Dockerfile for your app running with nginx.

```shell
nx g @codesdowork/nx-containers:nginx <appName> [-o <organization>] [-c] [-v <nodeVersion>]
```

##### Options

| Name            | Description                                                                     | alias | default   |
| --------------- | ------------------------------------------------------------------------------- | ----- |-----------|
| appName         | Name of the app you want to containerize                                        | -     | undefined |
| organization    | Organization is used as prefix for image names                                  | o     | undefined |
| dockerCompose   | Specify whether dockerCompose is usedl                                          | C     | undefined |
| nodeVersion     | Version of node-alpine docker image (only used when workspace generator is run) | V     | 20        |
| nginxVersion    | Version of nginx-alpine docker image                                            | v     | 1         |
| nginxConf       | Path to nginx.conf file                                                         | c     | undefined |
| confFolder      | Path to folder with config files, which will be copied into /etc/nginx/conf.d   | f     | undefined |
| templatesFolder | Path to folder with templates, which will be copied into /etc/nginx/templates   | t     | undefined |

### Executors

#### Build

This executor runs the build steps:

1. Build `base.Dockerfile` and tag it as `${organization}/${projectName}/base`
2. Build workspace Dockerfile and tag it as `${organization}/${projectName}/workspace`
3. Build app Dockerfile with specified options.

```shell
nx build-container <appName>
```

The target is automatically added by the generators for apps.
You can also add it manually by adding the following to your app's `project.json` file:

```
executor: "@codesdowork/nx-containers:build",
options: {
  image: org/mySapce/myApp,
  tags: ["latest"],
  organization: "org",
},
```

Or, if you don't want to add it as a target, just run

```shell
nx @codesdowork/nx-containers:build <appName> [-t <tags>] [-o <organization>] [-i <image>]
```

The executor automatically detects if the app has a service inside the `docker-compose.yml` file and
uses that service with `docker compose build`.

##### Options

| Name         | Description                                                                            | alias | default                                     |
| ------------ | -------------------------------------------------------------------------------------- | ----- | ------------------------------------------- |
| tags         | An array of tags for the app image [1]                                                 | t     | ["latest"]                                  |
| organization | Organization is used as prefix for image names                                         | o     | undefined                                   |
| image        | Custom name for the built image (only used when not specified in `docker-compose.yml`) | i     | `${organization}/${projectName}/${appName}` |

[1] You can also use `{version}`, `{major}`, `{minor}` and `{patch}` inside your tags.
They will automatically be replaced by their actual representation as specified inside `package.json`.

## Future

This package could contain a lot more functionality and is still in development.
Feel free to create issues or to contact me!
