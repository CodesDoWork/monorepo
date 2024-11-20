import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { projectRoot, replaceEnvs } from "nx-plugins-utils";
import { WranglerExecutorSchema } from "./schema";

type WranglerTarget = "deploy" | "delete";

export const runWranglerExecutor =
    (target: WranglerTarget): PromiseExecutor =>
    async ({ args = [] }: WranglerExecutorSchema, context) => {
        try {
            const projectDir = projectRoot(context);
            const { expandedArgs, usedEnvs } = replaceEnvs(args, context);
            await execAsync(`wrangler`, [target, ...expandedArgs], {
                cwd: projectDir,
                shell: true,
                secrets: usedEnvs,
            });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
