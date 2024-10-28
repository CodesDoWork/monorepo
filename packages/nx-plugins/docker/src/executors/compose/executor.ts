import { PromiseExecutor } from "@nx/devkit";
import path from "node:path";
import { loadAndExpandDotEnvFile } from "nx/src/tasks-runner/task-env";
import { getServiceInfo, runDockerCommand } from "../../utils";
import { ExecutorSchema } from "../schema";

export const runComposeExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { service, composeDir } = getServiceInfo(context);
        const composeEnv: Record<string, string> = {};
        loadAndExpandDotEnvFile(path.join(composeDir, ".env"), composeEnv);
        await runDockerCommand(["compose", ...(args ?? []), service], {
            cwd: composeDir,
            env: { ...process.env, ...composeEnv },
        });
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runComposeExecutor;
