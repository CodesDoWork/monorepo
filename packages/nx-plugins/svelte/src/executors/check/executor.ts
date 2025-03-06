import type { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { runViteBuildExecutor } from "@cdw/monorepo/nx-plugins-vite";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

export const runSvelteCheckExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        runViteBuildExecutor(undefined, context);
        await execAsync("svelte-check", [], {
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
