import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { PreviewVitepressExecutorSchema } from "./schema";

export const previewVitepressExecutor: PromiseExecutor<PreviewVitepressExecutorSchema> = async ({
    docs,
}) => {
    try {
        await execAsync(`vitepress`, ["preview", docs], { shell: true });

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default previewVitepressExecutor;
