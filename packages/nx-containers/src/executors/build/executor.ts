import { BuildExecutorSchema } from "./schema";
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { spawn } from "child_process";
import { versions } from "../../utils/versions";
import { Dockerfile, getImage } from "../../utils/docker";
import { Image } from "../../utils/Image";
import { sleep } from "../../utils/sleep";

const sanitizeOptions = (options: BuildExecutorSchema) => {
    if (!options.image && !options.dockerCompose) {
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
    console.info(cmd);
    let status = ExecuteStatus.Running;

    const [command, ...args] = cmd.split(" ");
    const process = spawn(command, args);
    process.stdout.on("data", data => console.info(data.toString()));
    process.stderr.on("data", data => console.error(data.toString()));
    process.on("exit", code => {
        if (code === 0) {
            status = ExecuteStatus.Done;
        } else {
            status = ExecuteStatus.Failed;
            console.error(`Finished with code: ${code}`);
        }
    });

    while (status === ExecuteStatus.Running) {
        await sleep(500);
    }

    return status;
};

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    sanitizeOptions(options);
    const { image, tags, organization, dockerfile, dockerCompose } = options;
    const appRoot = context.workspace.projects[context.projectName].root;

    console.info("Building base image");
    const baseStatus = await execute(
        dockerCompose
            ? dockerComposeBuild(Image.Base)
            : dockerBuild(
                  getImage(Image.Base, options.organization),
                  {},
                  [],
                  `${appRoot}/${Dockerfile.Base}`,
              ),
    );

    if (baseStatus === ExecuteStatus.Failed) {
        return { success: false };
    }

    console.info("Building workspace image");
    const workspaceStatus = await execute(
        dockerCompose
            ? dockerComposeBuild(Image.Workspace)
            : dockerBuild(
                  getImage(Image.Workspace, organization),
                  {},
                  [],
                  `${appRoot}/${Dockerfile.Normal}`,
              ),
    );

    if (workspaceStatus === ExecuteStatus.Failed) {
        return { success: false };
    }

    console.info(`Building image for ${context.projectName}`);
    const buildArgs = { VERSION: versions().version };
    const appStatus = await execute(
        dockerCompose
            ? dockerComposeBuild(context.projectName, buildArgs)
            : dockerBuild(image, buildArgs, tags, `${appRoot}/${dockerfile}`),
    );

    if (appStatus === ExecuteStatus.Failed) {
        return { success: false };
    }

    if (dockerCompose) {
        for (const tag of tags) {
            const tagStatus = await execute(`docker tag ${image} ${image}:${tag}`);
            if (tagStatus === ExecuteStatus.Failed) {
                return { success: false };
            }
        }
    }

    return {
        success: true,
    };
}

type BuildArgs = Record<string, string | number | boolean>;
const buildBuildArgs = (args: BuildArgs) =>
    ` --buildArgs ${Object.entries(args)
        .map(([key, value]) => `${key}=${value}`)
        .join(" ")}`;

const buildTags = (image: string, tags: string[]) =>
    tags.map(tag => `-t ${image}:${tag}`).join(" ");

const dockerComposeBuild = (service: string, args?: BuildArgs) =>
    `docker compose build${args ? buildBuildArgs(args) : ""} ${service}`;

const dockerBuild = (image: string, args?: BuildArgs, tags?: string[], dockerfile = "Dockerfile") =>
    `docker build${args ? buildBuildArgs(args) : ""} ${
        tags ? buildTags(image, tags) : ""
    } -f ${dockerfile} .`;
