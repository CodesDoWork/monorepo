import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runDockerCommand } from "@cdw/monorepo/nx-plugins-docker";
import { loadEnv } from "@cdw/monorepo/nx-plugins-utils";
import { getServiceInfo } from "../utils";

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
