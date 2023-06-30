import { log, logCmd } from "../../utils/logging";
import { spawn, ChildProcess } from "child_process";
import chalk from "chalk";

/**
 * Executes a command in a new ChildProcess.
 * The promise resolves when the process exits with status code 0 and will be rejected otherwise.
 */
export const executeCmd = (cmd: string): Promise<void> => {
    logCmd(cmd);
    const [command, ...args] = cmd.split(" ");
    return spawnLoggingProcess(command, ...args);
};

const spawnLoggingProcess = (command: string, ...args: string[]): Promise<void> =>
    new Promise<void>((resolve, reject) =>
        addLoggingToProcess(spawn(command, args)).on("exit", code =>
            code === 0 ? resolve() : reject(`Finished with code: ${code}`),
        ),
    );

const addLoggingToProcess = (process: ChildProcess): ChildProcess => {
    process.stdout?.on("data", data => log(chalk.cyan(data.toString())));
    process.stderr?.on("data", data => log(chalk.cyan(data.toString())));

    return process;
};
