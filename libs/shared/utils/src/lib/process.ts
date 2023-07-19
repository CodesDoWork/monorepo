import { ChildProcess, spawn } from "child_process";
import { logger } from "shared/logging";

/**
 * Executes a command in a new ChildProcess.
 * The promise resolves when the process exits with status code 0 and will be rejected otherwise.
 */
export const executeCmd = (cmdParts: string[]): Promise<void> => {
    logger.info(`Executing command: ${cmdParts.join(" ")}`);
    return spawnLoggingProcess(cmdParts[0], ...cmdParts.slice(1));
};

const spawnLoggingProcess = (command: string, ...args: string[]): Promise<void> =>
    new Promise<void>((resolve, reject) =>
        addLoggingToProcess(spawn(command, args)).on("exit", code =>
            code === 0 ? resolve() : reject(`Finished with code: ${code}`),
        ),
    );

const addLoggingToProcess = (process: ChildProcess): ChildProcess => {
    process.stdout?.on("data", data => logger.info(data.toString()));
    process.stderr?.on("data", data => logger.info(data.toString()));

    return process;
};
