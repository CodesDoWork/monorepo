import { BuildExecutorSchema } from "./schema";
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { spawn } from "child_process";
import { versions } from "../../utils/versions";
import { Dockerfile, getImage } from "../../utils/docker";
import { Image } from "../../utils/Image";
import { sleep } from "../../utils/sleep";
import { hasComposeService } from "../../utils/docker-compose";

const sanitizeOptions = (options: BuildExecutorSchema, projectName: string) => {
    if (!options.image && !hasComposeService(projectName)) {
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

    if (status === ExecuteStatus.Failed) {
        throw new Error(status);
    }

    return status;
};

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    const { workspace, projectName } = context;
    sanitizeOptions(options, projectName);
    const { image, tags, organization } = options;
    const appRoot = workspace.projects[projectName].root;

    console.info("Building base image");
    return execute(
        dockerBuild(getImage(Image.Base, organization), {}, tags, `${appRoot}/${Dockerfile.Base}`),
    )
        .then(() => {
            console.info("Building workspace image");
            return execute(
                dockerBuild(
                    getImage(Image.Workspace, organization),
                    {},
                    tags,
                    `${appRoot}/${Dockerfile.Normal}`,
                ),
            );
        })
        .then(() => {
            console.info(`Building image for ${projectName}`);
            const isComposeService = hasComposeService(projectName);
            const buildArgs = { VERSION: versions().version };
            return execute(
                isComposeService
                    ? dockerComposeBuild(projectName, buildArgs)
                    : dockerBuild(image, buildArgs, tags, `${appRoot}/${Dockerfile.Normal}`),
            );
        })
        .then(async () => {
            if (hasComposeService(projectName)) {
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
