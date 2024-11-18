import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";

type ViteTarget = "build" | "dev" | "preview";

export const runViteExecutor =
    (target: ViteTarget): PromiseExecutor =>
    async (_, context) => {
        try {
            const projectDir = projectRoot(context);
            await execAsync(`vite`, [target], {
                cwd: projectDir,
                shell: true,
            });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
