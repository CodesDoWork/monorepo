import type { ExecutorContext, PromiseExecutor } from "@nx/devkit";
import type { LighthouseExecutorSchema, LighthouseHeaders } from "./schema";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
    getProjectConfig,
    replaceEnvsInObject,
    replaceEnvsInString,
} from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { REPORTS_DIR } from "@cdw/monorepo/workspace-constants";
import { logger } from "@nx/devkit";

const LIGHTHOUSE_REPORTS_DIR = `${REPORTS_DIR}/lighthouse`;

export const runLighthouseExecutor: PromiseExecutor<LighthouseExecutorSchema> = async (
    { url, headers, enabled },
    context,
) => {
    if (enabled === false) {
        logger.info("Skipping lighthouse executor since it is not enabled.");
        return { success: true };
    }

    try {
        createReportsDir();
        const { name: projectName = "report" } = getProjectConfig(context);
        const reportPrefix = join(LIGHTHOUSE_REPORTS_DIR, projectName);

        const lighthouseUrl = replaceEnvsInString(url, context).expanded;
        const lighthouseHeaders = getLighthouseHeaders(headers ?? {}, context);
        const args = [
            "--chrome-flags='--headless --no-sandbox --disable-dev-shm-usage'",
            `--extra-headers='${JSON.stringify(lighthouseHeaders)}'`,
        ];

        await runLighthouse(args, `${reportPrefix}-mobile.html`, lighthouseUrl);
        await runLighthouse(
            [...args, "--preset=desktop"],
            `${reportPrefix}-desktop.html`,
            lighthouseUrl,
        );

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

function createReportsDir() {
    if (!existsSync(LIGHTHOUSE_REPORTS_DIR)) {
        mkdirSync(LIGHTHOUSE_REPORTS_DIR, { recursive: true });
    }
}

function getLighthouseHeaders(
    headers: LighthouseHeaders,
    context: ExecutorContext,
): Record<string, string> {
    const { Authorization, ...lighthouseHeaders } = headers;
    if (Authorization) {
        const {
            expanded: { user, password, token, type },
        } = replaceEnvsInObject(Authorization, context);
        if (type === "basic" && user && password) {
            const credentials = Buffer.from(`${user}:${password}`).toString("base64");
            lighthouseHeaders.Authorization = `Basic ${credentials}`;
        }

        if (type === "bearer" && token) {
            lighthouseHeaders.Authorization = `Bearer ${token}`;
        }
    }

    return lighthouseHeaders;
}

async function runLighthouse(args: string[], output: string, lighthouseUrl: string) {
    await execAsync("lighthouse", [...args, "--output-path", output, lighthouseUrl], {
        shell: true,
    });
}

export default runLighthouseExecutor;
