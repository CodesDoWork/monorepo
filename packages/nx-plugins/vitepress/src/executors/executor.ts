import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { SpawnOptionsWithoutStdio } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { VitepressExecutorSchema } from "./schema";

type VitepressTarget = "build" | "dev" | "preview";

export const runVitepressExecutor =
    (target: VitepressTarget): PromiseExecutor<VitepressExecutorSchema> =>
    async (options, context) => {
        try {
            if (target !== "preview") {
                copyAssets(options);
            }

            await execAsync("vitepress", [target], getShellOptions(options, context));

            return { success: true };
        } catch (e) {
            logger.error(e);
            return { success: false };
        }
    };

function copyAssets({ docs, assets }: VitepressExecutorSchema) {
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
}

export function getShellOptions(
    { docs, outDir }: VitepressExecutorSchema,
    context: ExecutorContext,
): SpawnOptionsWithoutStdio {
    const { env } = process;
    const absoluteDocsPath = path.join(context.root, docs);
    const absoluteDistPath = path.join(context.root, "dist");
    const defaultDist = path.join(path.relative(absoluteDocsPath, absoluteDistPath), docs);
    env.VITEPRESS_OUT_DIR = outDir || defaultDist;

    return { cwd: docs, shell: true, env };
}
