import {
    dockerComposeDownExecutor,
    dockerComposeUpExecutor,
    dockerImage,
    getServiceNetwork,
} from "@codesdowork/nx-plugins-docker";
import { execAsync } from "@codesdowork/shared-utils";
import { PromiseExecutor } from "@nx/devkit";
import { existsSync, mkdirSync } from "fs";
import * as path from "node:path";
import { LighthouseExecutorSchema } from "./schema";

const REPORTS_DIR = "lighthouse-reports";

export const runLighthouseExecutor: PromiseExecutor<LighthouseExecutorSchema> = async (
    { urls },
    context,
) => {
    try {
        if (!existsSync(REPORTS_DIR)) {
            mkdirSync(REPORTS_DIR, { recursive: true });
        }

        await dockerComposeUpExecutor({}, context);

        const lighthouseImage = dockerImage("nx-plugins-test-lighthouse");
        for (const url of urls) {
            await execAsync("docker", [
                "run --rm",
                "--cap-drop ALL",
                "--cap-add SYS_ADMIN",
                `--mount type=bind,source=${path.join(context.root, REPORTS_DIR)},target=/lighthouse-reports`,
                `--network ${getServiceNetwork(context)}`,
                lighthouseImage,
                url,
            ]);
        }

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    } finally {
        await dockerComposeDownExecutor({}, context);
    }
};

export default runLighthouseExecutor;
