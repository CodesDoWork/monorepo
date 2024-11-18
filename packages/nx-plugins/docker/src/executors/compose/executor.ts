import { PromiseExecutor } from "@nx/devkit";
import { loadEnv } from "nx-plugins-utils";
import { getServiceInfo, runDockerCommand } from "../../utils";
import { ExecutorSchema } from "../schema";

export const runComposeExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        const { service, composeDir } = getServiceInfo(context);
        await runDockerCommand(["compose", ...(args ?? []), service], {
            cwd: composeDir,
            env: { ...process.env, ...loadEnv(composeDir) },
        });
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runComposeExecutor;
