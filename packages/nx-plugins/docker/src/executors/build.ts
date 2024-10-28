import { PromiseExecutor } from "@nx/devkit";
import { runDockerCommand } from "../run-command";
import { getBaseVars } from "./docker-base";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION, projectRoot } = getBaseVars(context);
        await runDockerCommand([
            "build",
            `-t ${IMAGE_BASE}/${context.projectName}:${PROJECT_VERSION}`,
            `-f ${projectRoot}/Dockerfile`,
            `--build-arg IMAGE_BASE=${IMAGE_BASE}`,
            `--build-arg PROJECT_VERSION=${PROJECT_VERSION}`,
            ".",
        ]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
