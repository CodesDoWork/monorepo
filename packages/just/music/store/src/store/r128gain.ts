import { spawnSync } from "node:child_process";
import { createLogger } from "@cdw/monorepo/shared-logging";
import { parseFile } from "music-metadata";

const logger = createLogger("r128gain");

export async function normalizeGainIfNecessary(filePath: string) {
    const metadata = await parseFile(filePath);
    const { common } = metadata;
    if ("replaygain_track_gain" in common && "replaygain_track_peak" in common) {
        return;
    }

    writeNormalizationTags(filePath);
}

function writeNormalizationTags(filePath: string) {
    const { error, stdout, stderr } = spawnSync("r128gain", ["--", filePath], {
        encoding: "utf-8",
    });

    if (error) {
        logger.error(error, `Failed to normalize gain for ${filePath}`);
        throw error;
    }

    logger.info(`Normalized gain for ${filePath}. Outout: ${stdout || stderr}`);
}
