import type { PromiseExecutor } from "@nx/devkit";
import { getJitiAliasContent, projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

type ViteTarget = "build" | "dev" | "preview";

export function runViteExecutor(target: ViteTarget): PromiseExecutor {
    return async (_, context) => {
        try {
            const projectDir = projectRoot(context);
            await execAsync(`vite`, [target], {
                cwd: projectDir,
                shell: true,
                env: {
                    ...process.env,
                    JITI_ALIAS: getJitiAliasContent(projectDir, context),
                },
            });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
}
