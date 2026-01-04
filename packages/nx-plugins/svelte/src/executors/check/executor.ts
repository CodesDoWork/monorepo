import type { PromiseExecutor } from "@nx/devkit";
import { getProjectConfig } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

export const runSvelteCheckExecutor: PromiseExecutor = async (_, context) => {
    try {
        const { root: projectDir, name } = getProjectConfig(context);
        await execAsync("nx", ["build", name]);
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
