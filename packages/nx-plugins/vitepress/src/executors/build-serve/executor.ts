import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { BuildServeVitepressExecutorSchema } from "./schema";

export const buildServeVitepressExecutor =
    (target: "build" | "dev"): PromiseExecutor<BuildServeVitepressExecutorSchema> =>
    async ({ docs, assets }) => {
        try {
            if (assets) {
                Object.entries(assets).forEach(([outDir, assetPaths]) => {
                    const dst = path.join(docs, outDir);
                    if (!existsSync(dst)) {
                        mkdirSync(dst, { recursive: true });
                    }

                    assetPaths.forEach(assetPath =>
                        copyFileSync(assetPath, path.join(dst, path.basename(assetPath))),
                    );
                });
            }

            await execAsync("vitepress", [target, docs], { shell: true });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
