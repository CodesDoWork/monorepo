import type { PromiseExecutor } from "@nx/devkit";
import type { LighthouseExecutorSchema } from "./schema";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
    getProjectConfig,
    replaceEnvsInObject,
    replaceEnvsInString,
} from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

const REPORTS_DIR = "_reports/lighthouse";

export const runLighthouseExecutor: PromiseExecutor<LighthouseExecutorSchema> = async (
    { url, headers, enabled },
    context,
) => {
    if (enabled === false) {
        logger.info("Skipping lighthouse executor since it is not enabled.");
        return { success: true };
    }

    const { Authorization, ...lighthouseHeaders } = headers || {};
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

    try {
        createReportsDir();
        const { name: projectName } = getProjectConfig(context);
        const lighthouseUrl = replaceEnvsInString(url, context).expanded;
        const args = [
            "--chrome-flags='--headless --no-sandbox'",
            `--extra-headers='${JSON.stringify(lighthouseHeaders)}'`,
        ];

        await execAsync(
            "lighthouse",
            [
                ...args,
                "--output-path",
                `${join(REPORTS_DIR, projectName ?? "report")}-mobile.html`,
                lighthouseUrl,
            ],
            { shell: true },
        );

        await execAsync(
            "lighthouse",
            [
                ...args,
                "--preset=desktop",
                "--output-path",
                `${join(REPORTS_DIR, projectName ?? "report")}-desktop.html`,
                lighthouseUrl,
            ],
            { shell: true },
        );

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

function createReportsDir() {
    if (!existsSync(REPORTS_DIR)) {
        mkdirSync(REPORTS_DIR, { recursive: true });
    }
}

export default runLighthouseExecutor;
