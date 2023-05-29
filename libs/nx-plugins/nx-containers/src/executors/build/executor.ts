import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { spawn } from "child_process";
import { versions } from "../../utils/versions";
import { Dockerfile, getImage, WorkspaceImage } from "../../utils/docker";
import { sleep } from "../../utils/sleep";
import { defaultComposeFile, getComposeService } from "../../utils/docker-compose";
import chalk from "chalk";
import { log, logCmd, logError, logStep } from "../../utils/logging";
import { existsSync } from "fs";
import {
    generateAppDockerfile,
    generateBaseDockerfile,
    generateWorkspaceDockerfile,
} from "../../generators/dockerfiles/generator";
import { getWorkspaceConfig } from "../../generators/workspace/getWorkspaceConfig";
import { join } from "path";
import { getAppConfig } from "../../generators/app/getAppConfig";
import { FsTree } from "nx/src/generators/tree";

enum ExecuteStatus {
    Running = "running",
    Done = "done",
    Failed = "failed",
}

const execute = async (cmd: string): Promise<ExecuteStatus> => {
    logCmd(cmd);
    let status = ExecuteStatus.Running;

    const [command, ...args] = cmd.split(" ");
    const process = spawn(command, args);
    process.stdout.on("data", data => log(chalk.cyan(data.toString())));
    process.stderr.on("data", data => log(chalk.cyan(data.toString())));
    process.on("exit", code => {
        if (code === 0) {
            status = ExecuteStatus.Done;
        } else {
            status = ExecuteStatus.Failed;
            logError(`Finished with code: ${code}`);
        }
    });

    while (status === ExecuteStatus.Running) {
        await sleep(500);
    }

    if (status === ExecuteStatus.Failed) {
        throw new Error(status);
    }

    return status;
};

export default async function runExecutor(_options: unknown, context: ExecutorContext) {
    const { workspace, projectName, root, configurationName } = context;
    const appRoot = workspace.projects[projectName].root;

    const tree = new FsTree(root, false);
    const appConfig = getAppConfig(tree, projectName);
    const workspaceConfig = getWorkspaceConfig(tree);
    const { organization, composeFile, registry } = workspaceConfig;

    const isComposeService = !!getComposeService(projectName, composeFile)?.build;
    const image = getImage(projectName, organization);
    const { version, major, minor, patch } = versions(appRoot, root);
    appConfig.tags = appConfig.tags.map(tag =>
        tag
            .replace("{version}", version)
            .replace("{major}", major)
            .replace("{minor}", minor)
            .replace("{patch}", patch),
    );

    const tempFilesDir = join(__dirname.replace(root, ""), "tmp");

    logStep("Building base image");
    let baseDockerfile = join(root, Dockerfile.Base);
    if (!existsSync(baseDockerfile)) {
        baseDockerfile = join(tempFilesDir, Dockerfile.Base);
        await generateBaseDockerfile(tree, workspaceConfig, tempFilesDir, true);
    }

    return execute(
        dockerBuild(
            getImage(WorkspaceImage.Base, organization),
            undefined,
            undefined,
            baseDockerfile,
        ),
    )
        .then(async () => {
            logStep("Building workspace image");
            let workspaceDockerfile = join(root, Dockerfile.Normal);
            if (!existsSync(workspaceDockerfile)) {
                workspaceDockerfile = `${tempFilesDir}/${Dockerfile.Normal}`;
                await generateWorkspaceDockerfile(tree, workspaceConfig, tempFilesDir, true);
            }

            return execute(
                dockerBuild(
                    getImage(WorkspaceImage.Workspace, organization),
                    undefined,
                    undefined,
                    workspaceDockerfile,
                ),
            );
        })
        .then(async () => {
            logStep(`Building image for ${projectName}`);
            let appDockerfile = join(appRoot, Dockerfile.Normal);
            if (!existsSync(appDockerfile)) {
                const tmpAppPath = join(tempFilesDir, "apps", projectName);
                appDockerfile = join(tmpAppPath, Dockerfile.Normal);
                await generateAppDockerfile(tree, projectName, workspaceConfig, tmpAppPath, true);
            }

            const buildArgs = { VERSION: version };
            return execute(
                isComposeService
                    ? dockerComposeBuild(projectName, buildArgs, workspaceConfig.composeFile)
                    : dockerBuild(image, buildArgs, appConfig.tags, appDockerfile),
            );
        })
        .then(async () => {
            const isPublishMode = configurationName === "production" && registry;
            const imageTag = isPublishMode ? `${registry}/${image}` : image;
            isPublishMode && (await execute(`docker tag ${image} ${imageTag}`));

            if (isComposeService) {
                for (const tag of appConfig.tags) {
                    await execute(`docker tag ${imageTag} ${imageTag}:${tag}`);
                }
            }

            isPublishMode && (await execute(`docker push ${image}`));
        })
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }))
        .finally(async () => {
            try {
                await execute("docker image prune -f");
            } catch (e) {
                // already logged inside execute()
            }
        });
}

type BuildArgs = Record<string, string | number | boolean>;
const buildBuildArgs = (args: BuildArgs) =>
    Object.entries(args)
        .map(([key, value]) => `--build-arg ${key}=${value}`)
        .join(" ");

const buildTags = (image: string, tags: string[]) =>
    tags.map(tag => `-t ${image}:${tag}`).join(" ");

const buildCommand = (...parts: string[]) => parts.filter(Boolean).join(" ");

const dockerComposeBuild = (service: string, args?: BuildArgs, configFile = defaultComposeFile) =>
    buildCommand(
        "docker compose",
        `-f ${configFile}`,
        "build",
        args ? buildBuildArgs(args) : "",
        service,
    );

const dockerBuild = (
    image: string,
    args?: BuildArgs,
    tags?: string[],
    dockerfile = "Dockerfile",
) => {
    const argsArg = args ? buildBuildArgs(args) : "";
    const tagsArg = tags ? buildTags(image, tags) : `-t ${image}`;

    return buildCommand("docker build", argsArg, tagsArg, `-f ${dockerfile}`, ".");
};
