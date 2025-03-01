import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { dockerImage, runDockerCommand } from "../utils";

export const dockerPushExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const service = context.projectName ?? "";
        if (!args || !args[0]) {
            throw new Error("No tag specified");
        }

        await runDockerCommand(["tag", dockerImage(service), dockerImage(service, args[0])]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default dockerPushExecutor;
