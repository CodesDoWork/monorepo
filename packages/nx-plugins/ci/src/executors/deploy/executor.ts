import { execAsync } from "@codesdowork/shared-utils";
import { logger, PromiseExecutor } from "@nx/devkit";
import path from "node:path";
import { loadEnv, projectRoot, replaceEnvs } from "nx-plugins-utils";
import { DeployExecutorSchema } from "./schema";

export const runDeployExecutor: PromiseExecutor<DeployExecutorSchema> = async (
    { enabled, files, commands },
    context,
) => {
    if (!enabled) {
        logger.info("Skipping deploy executor since deployment is not enabled.");
        return { success: true };
    }

    try {
        const projectDir = projectRoot(context);
        const { ORGANIZATION, PROJECT } = loadEnv();

        const user = getSSHVariableSafe("username");
        const host = getSSHVariableSafe("host");
        const rootDestination = getSSHVariableSafe("rootDestination");
        const dest =
            getSSHVariable("dest") || `${rootDestination}/${ORGANIZATION}/${PROJECT}/${projectDir}`;
        const login = `${user}@${host}`;

        const { idRsaFile, knownHostsFile } = await setupSSHDir(projectDir);
        const sshOptions = [`-i ${idRsaFile}`, `-o UserKnownHostsFile=${knownHostsFile}`];

        await execAsync("ssh", [...sshOptions, login, "mkdir -p", dest]);

        await Promise.all(
            (files || []).map(file =>
                execAsync("scp", [
                    ...sshOptions,
                    path.join(projectDir, file),
                    `${login}:${path.join(dest, file)}`,
                ]),
            ),
        );

        const { expandedArgs: expandedCommands } = replaceEnvs(commands || [], context);
        for (const command of expandedCommands) {
            await execAsync("ssh", [...sshOptions, login, `cd ${dest}`, "&&", command]);
        }

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

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

export default runDeployExecutor;
