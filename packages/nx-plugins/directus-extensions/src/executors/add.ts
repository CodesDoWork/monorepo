import type { PromiseExecutor } from "@nx/devkit";
import { spawn } from "node:child_process";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { logger } from "@nx/devkit";

export const addDirectusExtensionExecutor: PromiseExecutor = async (_, context) => {
    try {
        const projectDir = projectRoot(context);
        await new Promise<void>((resolve, reject) => {
            const child = spawn("directus-extension", ["add"], {
                cwd: projectDir,
                shell: true,
                stdio: "inherit",
            });

            child.on("exit", code => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Process exited with code ${code}`));
                }
            });

            child.on("error", err => reject(err));
        });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default addDirectusExtensionExecutor;
