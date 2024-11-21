import { logger } from "@codesdowork/shared-logging";
import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";
import { env } from "../../../env";

export const download = (url: string): Promise<void> => {
    const downloadCommandParts = [
        "--extract-audio",
        ["-f", "bestaudio"],
        ["--audio-format", "mp3"],
        ["--audio-quality", "0"],
        "--embed-metadata",
        "--embed-thumbnail",
        ["--output", `${env.DOWNLOAD_DIR}/%(artist)s - %(title)s.%(ext)s`],
        "--no-overwrites",
        ["--metadata-from-title", "%(artist)s - %(title)s"],
        url,
    ].flat();

    return execAsync("yt-dlp", downloadCommandParts);
};

export function execAsync(command: string, args: string[], options?: SpawnOptionsWithoutStdio) {
    const cwdInfo = options?.cwd ? ` in "${options.cwd}"` : "";
    const fullCommand = [command, ...args].join(" ");
    logger.info(`Executing "${fullCommand}"${cwdInfo}`);

    return new Promise<void>((resolve, reject) => {
        const childProcess = spawn(command, args, options);
        childProcess.stdout.on("data", msg => logger.info(msg.toString()));
        childProcess.stderr.on("data", msg => logger.info(msg.toString()));
        childProcess.on("close", code =>
            code == 0 ? resolve() : reject(new Error(`Process exited with code ${code}`)),
        );
    });
}
