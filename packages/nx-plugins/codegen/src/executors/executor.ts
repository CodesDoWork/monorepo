import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { projectRoot } from "nx-plugins-utils";

export const runCodegenExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await execAsync(`graphql-codegen`, ["--config codegen.ts"], {
            cwd: projectDir,
            shell: true,
        });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default runCodegenExecutor;
