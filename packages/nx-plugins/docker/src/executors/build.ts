import { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";
import { dockerImage, getBaseDockerVars, runDockerCommand } from "../utils";
import { ExecutorSchema } from "./schema";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION, CI } = getBaseDockerVars();
        const image = dockerImage(context.projectName ?? "");
        const cacheImage = dockerImage(`${context.projectName}-cache`);
        const platform = CI ? "linux/amd64,linux/arm64" : "";
        const ciOptions = CI ? ["--push", "--network=host", "--load"] : [];

        const latestImageIfNeeded =
            CI &&
            PROJECT_VERSION === "master" &&
            `-t ${dockerImage(context.projectName ?? "", "latest")}`;

        await runDockerCommand([
            CI && "buildx",
            "build",
            `-t ${image}`,
            latestImageIfNeeded,
            `-f ${projectRoot(context)}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            `--cache-to type=registry,ref=${cacheImage},mode=max`,
            `--cache-from type=registry,ref=${cacheImage}`,
            platform && `--platform=${platform}`,
            ...ciOptions,
            ...(args ?? []),
            ".",
        ]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerBuildExecutor;
