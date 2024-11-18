import { logger } from "@nx/devkit";
import chalk from "chalk";
import { spawn, SpawnOptionsWithoutStdio } from "node:child_process";

export function execAsync(
    command: string,
    args?: (string | undefined)[],
    options?: SpawnOptionsWithoutStdio,
) {
    const allArgs = (args ?? [])
        .filter(arg => !!arg)
        .map(arg => arg as string)
        .flatMap(arg => arg.split(" "));

    const fullCommand = [command, ...allArgs].join(" ");
    const cwdInfo = options?.cwd ? ` in ${chalk.bold(options.cwd)}` : "";
    logger.info(`Executing ${chalk.bold(fullCommand)}${cwdInfo}`);

    return new Promise<void>((resolve, reject) => {
        const childProcess = spawn(command, allArgs, options);
        childProcess.stdout.on("data", msg => logger.info(msg.toString()));
        childProcess.stderr.on("data", msg => logger.info(msg.toString()));
        childProcess.on("close", code => (code == 0 ? resolve() : reject()));
    });
}
