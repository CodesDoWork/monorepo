import { existsSync, readFileSync } from "node:fs";
import { hostname } from "node:os";
import { z } from "zod";
import { HealthStatus } from "./HealthStatus";

const MILLIS_PER_SEC = 1000;
const DEFAULT_DECIMALS = 2;

export const healthcheckResultType = z.object({
    status: z.nativeEnum(HealthStatus),
    startupTime: z.date(),
    hostname: z.string(),
    version: z.string(),
    memoryUsed: z.number(),
    memoryUsedFormatted: z.string(),
    heapUsed: z.number(),
    heapUsedFormatted: z.string(),
    heapTotal: z.number(),
    heapTotalFormatted: z.string(),
    timestamp: z.date(),
});

export type HealthcheckResult = z.infer<typeof healthcheckResultType>;

export const commitFile = "./commit.sha";

export function createHealthcheckResult(status: HealthcheckResult["status"]): HealthcheckResult {
    const { rss: memoryUsed, heapUsed, heapTotal } = process.memoryUsage();
    const projectVersion = process.env.VERSION ?? "development";
    const lastCommit = existsSync(commitFile)
        ? readFileSync(commitFile).toString().trim()
        : "development";

    return {
        status,
        startupTime: new Date(Date.now() - process.uptime() * MILLIS_PER_SEC),
        hostname: hostname(),
        version: `${projectVersion} (${lastCommit})`,
        memoryUsed,
        heapUsed,
        heapTotal,
        memoryUsedFormatted: formatBytes(memoryUsed),
        heapUsedFormatted: formatBytes(heapUsed),
        heapTotalFormatted: formatBytes(heapTotal),
        timestamp: new Date(),
    };
}

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export function formatBytes(bytes: number, decimals = DEFAULT_DECIMALS) {
    if (!bytes) {
        return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
