import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";
import { runViteBuildExecutor } from "nx-plugins-vite";

export const runSvelteCheckExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        runViteBuildExecutor(undefined, context);
        await execAsync(`svelte-check`, [], {
            cwd: projectDir,
            shell: true,
        });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default runSvelteCheckExecutor;
