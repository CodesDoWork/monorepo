import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { logger } from "@cdw/monorepo/shared-logging";
import { v4 as uuidV4 } from "uuid";

export const downloadStatus: Record<string, Record<string, ReadableStream>> = {};

export function getDownloadStatus(userLib: string, id: string): ReadableStream | null {
    const stream = downloadStatus[userLib]?.[id];
    if (!stream) {
        return null;
    }

    const [branch1, branch2] = stream.tee();
    downloadStatus[userLib]![id] = branch2;

    return branch1;
}

export function download(url: string, userLib: string, cookiesPath: string): string {
    const downloadCommandParts = [
        ["--js-runtimes", "node"],
        ["--cookies", cookiesPath],
        "--extract-audio",
        ["-f", "bestaudio"],
        ["--audio-format", "mp3"],
        ["--audio-quality", "0"],
        "--embed-metadata",
        "--embed-thumbnail",
        ["--output", `${userLib}/%(artist)s - %(title)s.%(ext)s`],
        "--no-overwrites",
        url,
    ].flat();

    if (!downloadStatus[userLib]) {
        downloadStatus[userLib] = {};
    }
    const userDownloads = downloadStatus[userLib];

    const id = uuidV4();
    userDownloads[id] = new ReadableStream({
        start(controller) {
            function send(msg: string) {
                controller.enqueue(`data: ${msg}\n\n`);
            }

            const downloadProcess = execAsync("yt-dlp", downloadCommandParts, msg => send(msg));
            downloadProcess.on("close", code => {
                const msg = code === 0 ? "Download complete" : `Process exited with code ${code}`;
                code === 0 ? logger.info(msg) : logger.error(msg);
                send(msg);
                controller.close();
                rmSync(cookiesPath);
                setTimeout(() => delete userDownloads[id], 60_000);
            });
        },
    });

    return id;
}

function execAsync(command: string, args: string[], onMsg?: (msg: string) => void): ChildProcess {
    const fullCommand = [command, ...args].join(" ");
    logger.info(`Executing "${fullCommand}"`);

    const childProcess = spawn(command, args);
    childProcess.stdout.on("data", msg => {
        msg = msg.toString();
        onMsg?.(msg);
        logger.info(msg.toString());
    });
    childProcess.stderr.on("data", msg => {
        msg = msg.toString();
        onMsg?.(msg);
        logger.info(msg.toString());
    });

    return childProcess;
}
