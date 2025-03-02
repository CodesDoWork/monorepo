import type { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

export const serveDirectusExtensionExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync(`directus-extension`, ["build -w --no-minify"], {
            cwd: projectDir,
            shell: true,
        });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default serveDirectusExtensionExecutor;
