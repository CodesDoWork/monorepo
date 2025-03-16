import type { SpawnOptionsWithoutStdio } from "node:child_process";
import { spawn } from "node:child_process";
import { logger } from "@nx/devkit";
import chalk from "chalk";

interface SecretOptions {
    secrets?: string[];
}

export function execAsync(
    command: string,
    args?: (string | false | undefined)[],
    { secrets, ...options }: SpawnOptionsWithoutStdio & SecretOptions = {},
) {
    const allArgs = (args ?? [])
        .filter(arg => !!arg)
        .map(arg => arg as string)
        .flatMap(arg => arg.split(" "));

    const cwdInfo = options?.cwd ? ` in ${chalk.bold(options.cwd)}` : "";
    let fullCommand = [command, ...allArgs].join(" ");
    secrets?.forEach(secret => (fullCommand = fullCommand.replaceAll(secret, "[MASKED]")));
    logger.info(`Executing ${chalk.bold(fullCommand)}${cwdInfo}`);

    return new Promise<void>((resolve, reject) => {
        const childProcess = spawn(command, allArgs, options);
        childProcess.stdout.on("data", msg => logger.info(msg.toString()));
        childProcess.stderr.on("data", msg => logger.info(msg.toString()));
        childProcess.on("close", code =>
            code === 0 ? resolve() : reject(new Error(`Process exited with code ${code}`)),
        );
    });
}
