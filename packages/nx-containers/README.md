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

-   workspace
-   node

#### Workspace

This generator creates a `Dockerfile` for your workspace including a `base.Dockerfile` to extend
other images from.

```shell
nx g @codesdowork/nx-containers:workspace [-o <organization>] [-v <nodeVersion>]
```

##### Options

| Name         | Description                                    | alias | default   |
| ------------ | ---------------------------------------------- | ----- | --------- |
| organization | Organization is used as prefix for image names | o     | undefined |
| nodeVersion  | Version of node-alpine docker image            | v     | 20        |

#### Node

Creates a Dockerfile for your node app. It extends from base and workspace images to keep things
simple and clean. A `build-container` target is automatically added to the `project.json` configuration.
It also runs the workspace generator if no Dockerfile exists inside the root directory.

```shell
nx g @codesdowork/nx-containers:node <appName> [-o <organization>] [-c] [-v <nodeVersion>]
```

##### Options

| Name          | Description                                                                                             | alias | default   |
| ------------- | ------------------------------------------------------------------------------------------------------- | ----- | --------- |
| appName       | Name of the app you want to containerize                                                                | -     | undefined |
| organization  | Organization is used as prefix for image names                                                          | o     | undefined |
| dockerCompose | Specify whether dockerCompose is used (app will be added as a service to the `docker-compose.yml` file) | c     | undefined |
| nodeVersion   | Version of node-alpine docker image (only used when workspace generator is run)                         | v     | 20        |

### Executors

#### Build

This executor runs the build steps:

1. Build `base.Dockerfile` and tag it as `${organization}/${projectName}/base`
2. Build workspace Dockerfile and tag it as `${organization}/${projectName}/workspace`
3. Build app Dockerfile with specified options.

```shell
nx build-container <appName>
```

The target is automatically added by the generators for apps. You can also add it manually by
adding the following to your app's `project.json` file:

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
