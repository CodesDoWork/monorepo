import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import { existsSync, mkdirSync } from "fs";
import path from "node:path";
import { dockerImage } from "nx-plugins-docker";
import {
    dockerComposeDownExecutor,
    dockerComposeUpExecutor,
    getServiceNetwork,
} from "nx-plugins-docker-compose";
import { replaceEnvs } from "nx-plugins-utils";
import { LighthouseExecutorSchema } from "../../schema";

const REPORTS_DIR = "reports/lighthouse";

export const runLighthouseExecutor: PromiseExecutor<LighthouseExecutorSchema> = async (
    { urls },
    context,
) => {
    try {
        createReportsDir();
        await dockerComposeUpExecutor({}, context);

        const lighthouseImage = dockerImage("nx-plugins-lighthouse");
        for (const url of replaceEnvs(urls, context).expandedArgs) {
            await execAsync("docker", [
                "run --rm",
                "--cap-drop ALL",
                "--cap-add SYS_ADMIN",
                `--mount type=bind,source=${path.join(context.root, REPORTS_DIR)},target=/lighthouse`,
                `--network ${getServiceNetwork(context)}`,
                lighthouseImage,
                url,
            ]);
        }

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    } finally {
        await dockerComposeDownExecutor({}, context);
    }
};

function createReportsDir() {
    if (!existsSync(REPORTS_DIR)) {
        mkdirSync(REPORTS_DIR, { recursive: true });
    }
}

export default runLighthouseExecutor;
