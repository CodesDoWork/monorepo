import { PromiseExecutor } from "@nx/devkit";
import { dockerImage, runDockerCommand } from "../utils";
import { ExecutorSchema } from "./schema";

export const dockerPullExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        await runDockerCommand(["pull", ...(args ?? []), dockerImage(context.projectName ?? "")]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerPullExecutor;
