import type { PromiseExecutor } from "@nx/devkit";
import type { WranglerExecutorSchema } from "./schema";
import { loadEnv, projectRoot, replaceEnvs } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

type WranglerTarget = "deploy" | "delete";

export function runWranglerExecutor(target: WranglerTarget): PromiseExecutor {
    return async ({ args = [], enabled }: WranglerExecutorSchema, context) => {
        if (!enabled) {
            logger.info("Skipping wrangler executor since deployment is not enabled.");
            return { success: true };
        }

        try {
            const projectDir = projectRoot(context);
            const { expandedArgs, usedEnvs } = replaceEnvs(args, context);
            const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_WORKERS_API_TOKEN } = loadEnv();
            await execAsync("wrangler", [target, ...expandedArgs], {
                cwd: projectDir,
                shell: true,
                secrets: usedEnvs,
                env: {
                    ...process.env,
                    CLOUDFLARE_ACCOUNT_ID,
                    CLOUDFLARE_API_TOKEN: CLOUDFLARE_WORKERS_API_TOKEN,
                },
            });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
}
