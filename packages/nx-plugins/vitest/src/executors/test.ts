import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";

export const runVitestExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync(`vitest`, ["--run", "--passWithNoTests"], {
            cwd: projectDir,
            shell: true,
        });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default runVitestExecutor;
