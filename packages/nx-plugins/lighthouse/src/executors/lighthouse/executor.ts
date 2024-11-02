import { execAsync } from "@codesdowork/shared-utils";
import { ExecutorContext, logger, PromiseExecutor } from "@nx/devkit";
import { existsSync, mkdirSync } from "fs";
import path from "node:path";
import {
    dockerComposeDownExecutor,
    dockerComposeUpExecutor,
    dockerImage,
    getServiceNetwork,
} from "nx-plugins-docker";
import { loadEnv, projectRoot } from "nx-plugins-utils";
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
        for (const url of expandUrls(urls, context)) {
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

function expandUrls(urls: string[], context: ExecutorContext): string[] {
    const env = loadEnv(projectRoot(context));
    return urls.map(url =>
        url.replace(
            /\$(\w+)|\${(\w+)}/g,
            (original: string, style1: string | undefined, style2: string | undefined) => {
                const key = style1 || style2 || "";
                return key in env ? env[key as string] || original : original;
            },
        ),
    );
}

export default runLighthouseExecutor;
