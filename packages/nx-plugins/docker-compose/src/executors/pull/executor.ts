import { execAsync } from "@codesdowork/shared-utils";
import { PromiseExecutor } from "@nx/devkit";
import { PullExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<PullExecutorSchema> = async (options, context) => {
    try {
        await execAsync("docker", [
            "compose",
            "pull",
            options.service || context.projectName || "",
        ]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
