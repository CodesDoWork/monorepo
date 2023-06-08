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

#### Apps

The following generators create `container.config.json` files for your apps.
They only contain information for the single project.
A `build-container` target is automatically added to the `project.json` configuration.
You can choose type and other options interactively.

```shell
nx g @codesdowork/nx-containers:app <appName>
```

You can also add a `copy` option to the app options like this:

```
"options": {
    "copy": [
        { "from": "srcPath", "to": "dstPath" }
        { "from": "--from=workspace /dist/srcPath", "to": "dstPath" }
    ]
}
```

You can also use `{version}`, `{major}`, `{minor}` and `{patch}` inside your tags.
They will automatically be replaced by their actual representation as specified inside `package.json` of the app.
If no `package.json` exists for the app, the one inside the root directory will be used.

#### DevImage

This generator builds a dev image with docker. After that it is available as
`[{organization}/]{workspace}/dev`.
If there is a `dev.Dockerfile` inside the root of your monorepo, it will be used for building the
image, otherwise a new one will be generated inside a tmp directory.

```shell
nx g @codesdowork/nx-containers:devImage
```

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
> will be tagged using that registry and is also immediately pushed after build finished.

## Future

This package could contain a lot more functionality and is still in development.
Feel free to create issues or to contact me!
