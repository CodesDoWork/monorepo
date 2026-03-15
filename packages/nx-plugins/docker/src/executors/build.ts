import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/packages/shared/utils/src";
import { logger } from "@nx/devkit";
import { dockerImage, getBaseDockerVars, runDockerCommand } from "../utils";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args = [] },
    context,
) => {
    const { projectName = "" } = context;
    try {
        const { IMAGE_BASE, PROJECT_VERSION, DOCKER_PROXY, CI } = getBaseDockerVars();
        await runDockerCommand([
            "buildx",
            "build",
            `-t ${dockerImage(projectName)}`,
            `-f ${projectRoot(context)}/Dockerfile`,
            "--network=host",
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            `--build-arg DOCKER_PROXY=${DOCKER_PROXY}`,
            ...(await getCiOptions(projectName, PROJECT_VERSION, CI)),
            ...args,
            ".",
        ]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

async function getCiOptions(
    projectName: string,
    projectVersion: string,
    isCI: string | undefined,
): Promise<string[]> {
    const ciOptions: string[] = [];

    if (isCI) {
        const cacheImageName = `${projectName}-cache`;
        const cacheImage = dockerImage(cacheImageName);
        ciOptions.push(
            "--push",
            "--platform=linux/arm64",
            `--cache-to type=registry,ref=${cacheImage},mode=max`,
            ...(await getCICacheOptions(cacheImageName, cacheImage)),
        );

        if (projectVersion === "master") {
            ciOptions.push(`-t ${dockerImage(projectName, "latest")}`);
        }
    } else {
        ciOptions.push("--load");
    }

    return ciOptions;
}

async function getCICacheOptions(cacheImageName: string, cacheImage: string): Promise<string[]> {
    const cacheOptions: string[] = [];

    const devCacheImage = dockerImage(cacheImageName, "develop");
    await execAsync("docker", ["manifest", "inspect", devCacheImage], { logging: false })
        .then(() => cacheOptions.push(`--cache-from type=registry,ref=${devCacheImage}`))
        .catch(() => logger.warn("Develope cache image not found"));
    await execAsync("docker", ["manifest", "inspect", cacheImage], { logging: false })
        .then(() => cacheOptions.push(`--cache-from type=registry,ref=${cacheImage}`))
        .catch(() => logger.warn("Cache image not found"));

    return cacheOptions;
}

export default dockerBuildExecutor;
