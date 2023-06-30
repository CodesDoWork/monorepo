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
- [devImage](#devImage)
- [dockerfiles](#dockerfiles)

#### Workspace

This generator creates a `container.config.json` file for your workspace.
This is the configuration, which holds information needed to build Dockerfiles and images.

```shell
nx g @codesdowork/nx-containers:workspace
```

You can also add extensions to the config like this:

```
"workspaceExtensions": {
    "preInstall": [
        "RUN apk add git",
        "RUN npm i -g pnpm"
    ],
    "preCopy": [
        "RUN some command"
    ]
}
```

This adds the given lines to the specified dockerfileAreas.
You can choose between the following areas:

- preInstall
- postInstall
- preCopy
- preChecks
- end

The same applies for `baseExtensions`.

#### Apps

The following generators create `container.config.json` files for your apps.
They only contain information for the single project.
A `build-container` target is automatically added to the `project.json` configuration.
You can choose type and other options interactively.

```shell
nx g @codesdowork/nx-containers:app <appName>
```

As inside the workspace config, you can add extensions to your app config like this:

```json
"extensions": {
    "preInstall": [
        "RUN npm i -g some-package"
    ],
    "preCopy": [
        "RUN some command"
    ]
}
```

You can also use `{version}`, `{major}`, `{minor}` and `{patch}` inside your tags.
They will automatically be replaced by their actual representation as specified inside `package.json` of the app.
If no `package.json` exists for the app, the one inside the root directory will be used.

#### Dockerfiles

This generator creates Dockerfiles for base, workspace, dev and app images.
You can choose which ones to create.
This is only necessary if you need further customization.
The executor also works without Dockerfiles.

```shell
nx g @codesdowork/nx-containers:dockerfiles [<appName>]
```

### Executors

#### Build

This executor runs the build steps:

1. Build `base.Dockerfile` and tag it as `${organization}/${projectName}/base`
2. Build workspace Dockerfile and tag it as `${organization}/${projectName}/workspace`
3. Build app Dockerfile with specified options.

```shell
nx build-container <appName>
```

> **Note**
> If you don't create Dockerfiles, they will be generated inside a tmp directory for you.
> These Dockerfiles check with nx format, lint, test and build.
> If any of these commands fails, the image won't get built.

The target is automatically added by the generators for apps.
You can also add it manually by adding the following to your app's `project.json` file:

```
"build-image": {
    "builder": "@codesdowork/nx-containers:build"
}
```

Or, if you don't want to add it as a target, just run

```shell
nx @codesdowork/nx-containers:build <appName>
```

The executor automatically detects if the app has a service inside the `composeFile` you chose and
uses that service with `docker compose build`.

> If you specified a `registry` inside the app or workspace `container.config.json` file, the image
> will be tagged using that registry.
> Ts also immediately pushed after build finished if configuration is production.

In case you want to add additional build parameters (e.g. `--network host`) to docker build command,
you can do so by adding a `args` entry to `options`:

```json
"build-image": {
    "builder": "@codesdowork/nx-containers:build",
    "options": {
        "args": "whatever you want"
    }
}
```

## Future

This package could contain a lot more functionality and is still in development.
Feel free to create issues or to contact me!
