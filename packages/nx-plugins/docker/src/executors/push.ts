import { PromiseExecutor } from "@nx/devkit";
import { dockerImage, runDockerCommand } from "../utils";

export const dockerPushExecutor: PromiseExecutor = async (_, context) => {
    try {
        await runDockerCommand(["push", dockerImage(context.projectName ?? "")]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerPushExecutor;
