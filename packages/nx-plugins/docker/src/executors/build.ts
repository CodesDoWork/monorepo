import { projectRoot } from "@codesdowork/nx-plugins-utils";
import { PromiseExecutor } from "@nx/devkit";
import { dockerImage, getBaseDockerVars, runDockerCommand } from "../utils";

export const dockerBuildExecutor: PromiseExecutor = async (_, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
        await runDockerCommand([
            "build",
            `-t ${dockerImage(context.projectName ?? "")}`,
            `-f ${projectRoot(context)}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            ".",
        ]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerBuildExecutor;
