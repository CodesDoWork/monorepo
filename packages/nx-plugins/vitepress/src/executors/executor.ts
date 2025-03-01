import type { PromiseExecutor } from "@nx/devkit";
import type { VitepressExecutorSchema } from "./schema";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

type VitepressTarget = "build" | "dev" | "preview";

export function runVitepressExecutor(target: VitepressTarget): PromiseExecutor<VitepressExecutorSchema> {
    return async (options, context) => {
        const projectDir = projectRoot(context);

        try {
            if (target !== "preview") {
                copyAssets(projectDir, options);
            }

            await execAsync("vitepress", [target, options.docs], {
                cwd: projectDir,
                shell: true,
            });

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };
}

function copyAssets(projectDir: string, { docs, assets }: VitepressExecutorSchema) {
    if (assets) {
        Object.entries(assets).forEach(([outDir, assetPaths]) => {
            const dst = path.join(projectDir, docs, outDir);
            if (!existsSync(dst)) {
                mkdirSync(dst, { recursive: true });
            }

            assetPaths.forEach(assetPath =>
                copyFileSync(
                    path.join(projectDir, assetPath),
                    path.join(dst, path.basename(assetPath)),
                ),
            );
        });
    }
}
