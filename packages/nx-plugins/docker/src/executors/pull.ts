import { PromiseExecutor } from "@nx/devkit";
import { dockerImage, runDockerCommand } from "../utils";

export const dockerPullExecutor: PromiseExecutor = async (_, context) => {
    try {
        await runDockerCommand(["pull", dockerImage(context.projectName ?? "")]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerPullExecutor;
