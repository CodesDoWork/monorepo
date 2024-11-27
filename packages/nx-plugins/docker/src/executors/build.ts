import { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";
import { dockerImage, getBaseDockerVars, runDockerCommand, useBuilder } from "../utils";
import { ExecutorSchema } from "./schema";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION, CI } = getBaseDockerVars();
        const image = dockerImage(context.projectName ?? "");
        const cacheImage = dockerImage(`${context.projectName}-cache`);

        const builderBuildArgs = [];
        if (CI) {
            builderBuildArgs.push(
                ...(await useBuilder()),
                `--cache-to type=registry,ref=${cacheImage},mode=max`,
                `--cache-from type=registry,ref=${cacheImage}`,
            );
        }

        await runDockerCommand([
            "build",
            ...builderBuildArgs,
            `-t ${image}`,
            `-f ${projectRoot(context)}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            ...(args ?? []),
            ".",
        ]);

        if (CI) {
            await runDockerCommand(["push", image]);
        }

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerBuildExecutor;
