import { BuildExecutorSchema } from "./schema";
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { spawn } from "child_process";
import { versions } from "../../utils/versions";
import { Dockerfile, getImage, Image } from "../../utils/docker";
import { sleep } from "../../utils/sleep";
import { composeFile, hasComposeService } from "../../utils/docker-compose";
import chalk from "chalk";

const log = console.log;
const logStep = (step: string) => log(chalk.green.bold(step), "\n ");
const logError = (...data: any[]) => console.error(chalk.red(data));

const sanitizeOptions = (options: BuildExecutorSchema, projectName: string) => {
    if (!options.image && !hasComposeService(projectName, options.composeFile)) {
        throw new Error("You need to specify the image name!");
    }

    if (!options.tags) {
        options.tags = ["latest"];
    } else {
        const { version, major, minor, patch } = versions();
        options.tags = options.tags.map(tag =>
            tag
                .replace("{version}", version)
                .replace("{major}", major)
                .replace("{minor}", minor)
                .replace("{patch}", patch),
        );
    }
};

enum ExecuteStatus {
    Running = "running",
    Done = "done",
    Failed = "failed",
}

const execute = async (cmd: string): Promise<ExecuteStatus> => {
    log(chalk.blue("Executing: ", cmd));
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

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    const { workspace, projectName, root } = context;
    sanitizeOptions(options, projectName);
    const { image, tags, organization, composeFile } = options;
    const appRoot = workspace.projects[projectName].root;

    const isComposeService = hasComposeService(projectName, composeFile);

    logStep("Building base image");
    return execute(
        dockerBuild(
            getImage(Image.Base, organization),
            undefined,
            undefined,
            `${root}/${Dockerfile.Base}`,
        ),
    )
        .then(() => {
            logStep("Building workspace image");
            return execute(
                dockerBuild(
                    getImage(Image.Workspace, organization),
                    undefined,
                    undefined,
                    Dockerfile.Normal,
                ),
            );
        })
        .then(() => {
            logStep(`Building image for ${projectName}`);
            const buildArgs = { VERSION: versions().version };
            return execute(
                isComposeService
                    ? dockerComposeBuild(projectName, buildArgs, composeFile)
                    : dockerBuild(image, buildArgs, tags, `${appRoot}/${Dockerfile.Normal}`),
            );
        })
        .then(async () => {
            if (isComposeService) {
                logStep("Tagging image");
                for (const tag of tags) {
                    await execute(`docker tag ${image} ${image}:${tag}`);
                }
            }
        })
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }));
}

type BuildArgs = Record<string, string | number | boolean>;
const buildBuildArgs = (args: BuildArgs) =>
    Object.entries(args)
        .map(([key, value]) => `--build-arg ${key}=${value}`)
        .join(" ");

const buildTags = (image: string, tags: string[]) =>
    tags.map(tag => `-t ${image}:${tag}`).join(" ");

const buildCommand = (...parts: string[]) => parts.filter(Boolean).join(" ");

const dockerComposeBuild = (service: string, args?: BuildArgs, configFile = composeFile) =>
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
