import type { ExecutorContext } from "@nx/devkit";
import type { SSHOptions } from "./types";
import path from "node:path";
import { loadEnv, replaceEnvs } from "@cdw/monorepo/packages/nx-plugins/utils/src";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";

export async function setupSSH(projectDir: string) {
    const { ORGANIZATION, PROJECT } = loadEnv();

    const user = getSSHVariableSafe("username");
    const host = getSSHVariableSafe("host");
    const rootDestination = getSSHVariableSafe("rootDestination");
    const dest =
        getSSHVariable("dest") || `${rootDestination}/${ORGANIZATION}/${PROJECT}/${projectDir}`;
    const login = `${user}@${host}`;

    const { idRsaFile, knownHostsFile } = await setupSSHDir(projectDir);
    const sshOptions = [`-i ${idRsaFile}`, `-o UserKnownHostsFile=${knownHostsFile}`];

    return {
        sshOptions,
        login,
        dest,
    };
}

function getSSHVariableSafe(name: string): string {
    const value = getSSHVariable(name);
    if (!value) {
        throw new Error(`Missing SSH env variable: "${name}"`);
    }

    return value;
}

function getSSHVariable(name: string): string | undefined {
    return process.env[`SSH_${name.replace(/[A-Z]/g, "_$&").toUpperCase()}`];
}

async function setupSSHDir(projectDir: string) {
    const dir = path.join(projectDir, ".ssh");
    const idRsaFile = path.join(dir, "id_rsa");
    const knownHostsFile = path.join(dir, "known_hosts");
    await execAsync("chmod", ["700", dir]);
    await execAsync("chmod", ["400", idRsaFile]);

    return { idRsaFile, knownHostsFile };
}

export async function createTargetDirectory({ sshOptions, login, dest }: SSHOptions) {
    logger.info(`Creating target directory "${dest}"`);
    await execAsync("ssh", [...sshOptions, login, "mkdir -p", dest]);
}

export async function copyFiles(
    projectDir: string,
    files: string[],
    { sshOptions, login, dest }: SSHOptions,
) {
    logger.info(`Copying files\n\t- ${files.join("\n\t- ")} to "${dest}"`);
    await Promise.all(
        files.map(file =>
            execAsync("scp", [
                ...sshOptions,
                path.join(projectDir, file),
                `${login}:${path.join(dest, file)}`,
            ]),
        ),
    );
}

export async function executeCommands(
    context: ExecutorContext,
    commands: string[],
    { sshOptions, login, dest }: SSHOptions,
) {
    logger.info(`Executing commands\n\t- ${commands.join("\n\t- ")}`);
    const { expandedArgs: expandedCommands } = replaceEnvs(commands || [], context);
    for (const command of expandedCommands) {
        await execAsync("ssh", [...sshOptions, login, `cd ${dest}`, "&&", command]);
    }
}
