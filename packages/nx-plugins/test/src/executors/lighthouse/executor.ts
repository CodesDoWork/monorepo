import { execAsync } from "@codesdowork/shared-utils";
import { PromiseExecutor } from "@nx/devkit";
import { configDotenv } from "dotenv";
import { LighthouseExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<LighthouseExecutorSchema> = async options => {
    configDotenv();
    try {
        await execAsync("docker", ["compose", "up", "--wait", options.project]);
        for (const url of options.urls) {
            process.env.LIGHTHOUSE_TARGET_URL = url;
            await execAsync("docker", [
                "compose",
                "up",
                "--exit-code-from",
                "lighthouse",
                "lighthouse",
            ]);
        }

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    } finally {
        await execAsync("docker", ["compose", "down", "lighthouse", options.project]);
    }
};

export default runExecutor;
