import chalk from "chalk";

export const log = console.log;
export const logStep = (step: string) => log(chalk.green.bold(step), "\n ");
export const logCmd = (cmd: string) => log(chalk.blue("Executing: ", cmd));
export const logWarn = (...data: unknown[]) => console.error(chalk.yellow(data));
export const logError = (...data: unknown[]) => console.error(chalk.red(data));
