import { logger } from "@codesdowork/shared-logging";
import { ChildProcess, spawn } from "child_process";
import { env } from "../../../env";

export const download = (url: string): Promise<void> => {
    const downloadCommandParts = [
        "yt-dlp",
        "--extract-audio",
        ["--audio-format", "mp3"],
        ["--audio-quality", "0"],
        "--embed-metadata",
        "--embed-thumbnail",
        ["--output", `${env.DOWNLOAD_DIR}/%(artist)s - %(title)s.%(ext)s`],
        "--no-overwrites",
        ["--metadata-from-title", "%(artist)s - %(title)s"],
        ["--replace-in-metadata", "album", ".*", ""],
        ["--replace-in-metadata", "title", `\\[(?:${stopWords.join("|")})\\]`, ""],
        ["--replace-in-metadata", "title", `\\((?:${stopWords.join("|")})\\)`, ""],
        ["--replace-in-metadata", "title", " $", ""],
        url,
    ].flat();

    return executeCmd(downloadCommandParts);
};

const stopWords = [
    "Lyrics",
    "Lyric Video",
    "Official Video",
    "Official Music Video",
    "Official Lyric Video",
    "Audio",
    "Live",
    "HD",
    "4K",
];

function executeCmd(cmdParts: string[]): Promise<void> {
    logger.info(`Executing command: ${cmdParts.join(" ")}`);
    return spawnLoggingProcess(cmdParts[0], ...cmdParts.slice(1));
}

function spawnLoggingProcess(command: string, ...args: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) =>
        addLoggingToProcess(spawn(command, args)).on("exit", code =>
            code === 0 ? resolve() : reject(`Finished with code: ${code}`),
        ),
    );
}

function addLoggingToProcess(process: ChildProcess): ChildProcess {
    process.stdout?.on("data", data => logger.info(data.toString()));
    process.stderr?.on("data", data => logger.info(data.toString()));

    return process;
}
