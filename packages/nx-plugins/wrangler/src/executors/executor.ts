import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { loadEnv, projectRoot, replaceEnvs } from "nx-plugins-utils";
import { WranglerExecutorSchema } from "./schema";

type WranglerTarget = "deploy" | "delete";

export const runWranglerExecutor =
    (target: WranglerTarget): PromiseExecutor =>
    async ({ args = [] }: WranglerExecutorSchema, context) => {
        try {
            const projectDir = projectRoot(context);
            const { expandedArgs, usedEnvs } = replaceEnvs(args, context);
            const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_WORKERS_API_TOKEN } = loadEnv();
            await execAsync(`wrangler`, [target, ...expandedArgs], {
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
