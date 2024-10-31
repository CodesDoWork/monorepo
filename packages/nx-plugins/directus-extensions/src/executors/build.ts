import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { readFileSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import { projectRoot } from "nx-plugins-utils";

export const buildDirectusExtensionExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync(`directus-extension`, ["build"], {
            cwd: projectDir,
            shell: true,
        });

        const packageJsonPath = path.join(projectDir, "package.json");
        const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
        const distDir = path.dirname(packageJson["directus:extension"].path);
        packageJson["directus:extension"].path = "./index.js";

        writeFileSync(
            path.join(projectDir, distDir, "package.json"),
            JSON.stringify(packageJson, null, 4),
        );

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default buildDirectusExtensionExecutor;
