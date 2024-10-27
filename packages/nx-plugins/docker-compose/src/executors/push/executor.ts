import { execAsync } from "@codesdowork/utils";
import { PromiseExecutor } from "@nx/devkit";
import { PushExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<PushExecutorSchema> = async (options, context) => {
    try {
        await execAsync("docker", [
            "compose",
            "push",
            options.service || context.projectName || "",
        ]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
