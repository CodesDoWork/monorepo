import type { ExecutorContext } from "@nx/devkit";
import type { Migrations, SSHOptions } from "./types";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getProjectConfig, projectRoot } from "@cdw/monorepo/packages/nx-plugins/utils/src";
import { logger } from "@nx/devkit";
import { parse as parseYaml } from "yaml";
import { executeCommands } from "./ssh";
import { zMigrationsConfig } from "./types";

export async function runPreMigrations(
    context: ExecutorContext,
    { sshOptions, login, dest }: SSHOptions,
) {
    const { preCommands = [] } = getMigrations(context);
    if (!preCommands.length) {
        return;
    }

    logger.info(`Running pre-migrations:\n\t- ${preCommands.join("\n\t- ")}`);
    await executeCommands(context, preCommands, { sshOptions, login, dest });
}

export async function runPostMigrations(
    context: ExecutorContext,
    { sshOptions, login, dest }: SSHOptions,
) {
    const { postCommands = [] } = getMigrations(context);
    if (!postCommands.length) {
        return;
    }

    logger.info(`Running post-migrations:\n\t- ${postCommands.join("\n\t- ")}`);
    await executeCommands(context, postCommands, { sshOptions, login, dest });
}

function getMigrations(context: ExecutorContext): Migrations {
    const version = getProjectConfig(context).metadata?.js?.packageVersion;
    if (!version) {
        return { version: "unknown", preCommands: [], postCommands: [] };
    }

    const { migrations } = readMigrationsFile(context);
    const versionMigrations = migrations.find(m => m.version === version);
    if (!versionMigrations) {
        return { version, preCommands: [], postCommands: [] };
    }

    return versionMigrations;
}

function readMigrationsFile(context: ExecutorContext) {
    const migrationsFile = path.join(projectRoot(context), "ci.migrations.yaml");
    return zMigrationsConfig.parse(parseYaml(readFileSync(migrationsFile, "utf8")));
}
