import { execAsync } from "@codesdowork/utils";
import { PromiseExecutor } from "@nx/devkit";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        await execAsync("docker", ["compose", "build", context.projectName || ""]);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
