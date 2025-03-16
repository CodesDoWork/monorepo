import type { PromiseExecutor } from "@nx/devkit";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

export const buildDirectusExtensionExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync("directus-extension", ["build"], {
            cwd: projectDir,
            shell: true,
        });

        const packageJsonPath = join(projectDir, "package.json");
        const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
        const distDir = dirname(packageJson["directus:extension"].path);
        packageJson["directus:extension"].path = "./index.js";

        writeFileSync(
            join(projectDir, distDir, "package.json"),
            JSON.stringify(packageJson, null, 4),
        );

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default buildDirectusExtensionExecutor;
