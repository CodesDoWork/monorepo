import {
    dockerComposeDownExecutor,
    dockerComposeUpExecutor,
    dockerImage,
    getServiceNetwork,
} from "@codesdowork/nx-plugins-docker";
import { loadEnv, projectRoot } from "@codesdowork/nx-plugins-utils";
import { execAsync } from "@codesdowork/shared-utils";
import { ExecutorContext, logger, PromiseExecutor } from "@nx/devkit";
import { existsSync, mkdirSync, readFileSync } from "fs";
import path from "node:path";
import { z } from "zod";

const REPORTS_DIR = "reports/lighthouse";

const zLighthouseExecutorSchema = z.object({ urls: z.array(z.string()) });
type LighthouseExecutorSchema = z.infer<typeof zLighthouseExecutorSchema>;

export const runLighthouseExecutor: PromiseExecutor<LighthouseExecutorSchema> = async (
    { urls },
    context,
) => {
    try {
        createReportsDir();
        if (!urls) {
            urls = readConfig(context).urls;
        }

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

function readConfig(context: ExecutorContext): LighthouseExecutorSchema {
    const configFile = path.join(projectRoot(context), ".lighthouserc.json");
    if (existsSync(configFile)) {
        return zLighthouseExecutorSchema.parse(
            JSON.parse(readFileSync(configFile, "utf-8").toString()),
        );
    }

    throw new Error("'.lighthouserc.json' not found");
}

function expandUrls(urls: string[], context: ExecutorContext): string[] {
    const env = loadEnv(projectRoot(context));
    return urls.map(url => url.replace(/\$(\w+)|\${(\w+)}/g, (_, s1, s2) => env[s1 || s2]));
}

export default runLighthouseExecutor;
