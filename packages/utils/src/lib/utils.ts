import { logger } from "@nx/devkit";
import chalk from "chalk";
import { spawn } from "node:child_process";

export function execAsync(command: string, options?: string[]) {
    const allOptions = (options ?? []).flatMap(option => option.split(" "));

    const fullCommand = [command, ...allOptions].join(" ");
    logger.info(`Executing ${chalk.bold(fullCommand)}`);

    return new Promise<void>((resolve, reject) => {
        const childProcess = spawn(command, allOptions);
        childProcess.stdout.on("data", msg => logger.info(msg.toString()));
        childProcess.stderr.on("data", msg => logger.info(msg.toString()));
        childProcess.on("close", code => (code == 0 ? resolve() : reject()));
    });
}
