import type { PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";
import { writePackageJSON } from "./write-package-json";

export const buildDirectusExtensionExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync("directus-extension", ["build"], {
            cwd: projectDir,
            shell: true,
        });

        writePackageJSON(projectDir);

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default buildDirectusExtensionExecutor;
