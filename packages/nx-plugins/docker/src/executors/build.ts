import { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";
import {
    dockerImage,
    getBaseDockerVars,
    removeBuilder,
    runDockerCommand,
    useBuilder,
} from "../utils";
import { ExecutorSchema } from "./schema";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION, CI } = getBaseDockerVars();
        const image = dockerImage(context.projectName ?? "");
        const cacheImage = dockerImage(`${context.projectName}-cache`);

        const builderBuildArgs = [];
        const platforms = [];
        if (CI) {
            builderBuildArgs.push(
                ...(await useBuilder()),
                `--cache-to type=registry,ref=${cacheImage},mode=max`,
                `--cache-from type=registry,ref=${cacheImage}`,
            );
            platforms.push("linux/amd64", "linux/arm64");
        } else {
            platforms.push("");
        }

        const imageTags = [];
        for (const platform of platforms) {
            const tag = `${image}${platform ? "_" : ""}${platform.replace("/", "-")}`;
            imageTags.push(tag);

            await runDockerCommand([
                "build",
                ...builderBuildArgs,
                `-t ${tag}`,
                `-f ${projectRoot(context)}/Dockerfile`,
                `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
                `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
                platform && `--platform=${platform}`,
                ...(args ?? []),
                ".",
            ]);
        }

        if (CI) {
            await runDockerCommand([
                "manifest",
                "create",
                image,
                ...imageTags.map(t => `--amend ${t}`),
            ]);
            await runDockerCommand(["manifest", "push", image]);
            await removeBuilder();
        }

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerBuildExecutor;
