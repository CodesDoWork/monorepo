import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/packages/shared/utils/src";
import { dockerImage, getBaseDockerVars, runDockerCommand } from "../utils";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION, DOCKER_PROXY, CI } = getBaseDockerVars();
        const image = dockerImage(context.projectName ?? "");
        const cacheImageName = `${context.projectName}-cache`;
        const cacheImage = dockerImage(cacheImageName);
        const platform = CI ? "linux/arm64" : "";
        const ciOptions = CI
            ? ["--push", "--network=host", `--cache-to type=registry,ref=${cacheImage},mode=max`]
            : ["--load"];

        if (CI) {
            const devCacheImage = dockerImage(cacheImageName, "develop");
            await execAsync("docker", ["manifest", "inspect", devCacheImage]).then(() =>
                ciOptions.push(`--cache-from type=registry,ref=${devCacheImage}`),
            );
            await execAsync("docker", ["manifest", "inspect", cacheImage]).then(() =>
                ciOptions.push(`--cache-from type=registry,ref=${cacheImage}`),
            );
        }

        const latestImageIfNeeded =
            CI &&
            PROJECT_VERSION === "master" &&
            `-t ${dockerImage(context.projectName ?? "", "latest")}`;

        await runDockerCommand([
            "buildx",
            "build",
            `-t ${image}`,
            latestImageIfNeeded,
            `-f ${projectRoot(context)}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            `--build-arg DOCKER_PROXY=${DOCKER_PROXY}`,
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
