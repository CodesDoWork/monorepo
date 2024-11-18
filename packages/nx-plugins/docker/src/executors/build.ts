import { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";
import { dockerImage, getBaseDockerVars, runDockerCommand } from "../utils";
import { ExecutorSchema } from "./schema";

export const dockerBuildExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
        await runDockerCommand([
            "build",
            `-t ${dockerImage(context.projectName ?? "")}`,
            `-f ${projectRoot(context)}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            ...(args ?? []),
            ".",
        ]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerBuildExecutor;
