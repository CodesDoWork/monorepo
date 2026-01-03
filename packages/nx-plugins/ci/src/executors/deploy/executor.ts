import type { PromiseExecutor } from "@nx/devkit";
import type { DeployExecutorSchema } from "./schema";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { logger } from "@nx/devkit";
import { runPostMigrations, runPreMigrations } from "./migrations";
import { copyFiles, createTargetDirectory, executeCommands, setupSSH } from "./ssh";

export const runDeployExecutor: PromiseExecutor<DeployExecutorSchema> = async (
    { enabled, files, commands },
    context,
) => {
    if (!enabled) {
        logger.info("Skipping deploy executor since deployment is not enabled.");
        return { success: true };
    }

    try {
        const projectDir = projectRoot(context);
        const sshOptions = await setupSSH(projectDir);

        await createTargetDirectory(sshOptions);
        await runPreMigrations(context, sshOptions);
        await copyFiles(projectDir, files ?? [], sshOptions);
        await executeCommands(context, commands ?? [], sshOptions);
        await runPostMigrations(context, sshOptions);

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default runDeployExecutor;
