import { PromiseExecutor } from "@nx/devkit";
import { runDockerCommand } from "../run-command";
import { getBaseVars } from "./docker-base";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        const { IMAGE_BASE, PROJECT_VERSION } = getBaseVars(context);
        await runDockerCommand(["push", `${IMAGE_BASE}/${context.projectName}:${PROJECT_VERSION}`]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
