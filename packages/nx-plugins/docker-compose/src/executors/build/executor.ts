import { execAsync } from "@codesdowork/utils";
import { PromiseExecutor } from "@nx/devkit";
import { BuildExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
    try {
        await execAsync("docker", [
            "compose",
            "build",
            options.service || context.projectName || "",
        ]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
