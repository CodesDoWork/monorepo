import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { dockerImage, runDockerCommand } from "../utils";

export const dockerPullExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        await runDockerCommand(["pull", ...(args ?? []), dockerImage(context.projectName ?? "")]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerPullExecutor;
