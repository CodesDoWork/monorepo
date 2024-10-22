import { logger, Tree } from "@nx/devkit";
import inquirer from "inquirer";
import { execSync } from "node:child_process";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z, ZodSchema } from "zod";
import {
    Credentials,
    SecretCollectionConfig,
    SecretEnvConfig,
    zProjectSecretsConfig,
    zRootSecretConfig,
} from "./types";
import { CipherData } from "./types/bitwarden";

const ROOT_CONFIG_FILE = ".secrets.config.json";
const PROJECT_CONFIG_FILE = ".env.secure.yaml";

const cipherDataCache = new Map<string, CipherData>();

export async function setupBwCli(tree: Tree, credentials: Credentials) {
    setupWithRootConfig(tree);
    await login(credentials);
    syncBw();
}

function syncBw() {
    logger.info("Syncing Vault");
    try {
        execSync("bw sync");
    } catch (e) {
        logger.warn(e);
    }
}

function setupWithRootConfig(tree: Tree) {
    if (tree.exists(ROOT_CONFIG_FILE)) {
        const { server } = readConfigFile(tree, ROOT_CONFIG_FILE, zRootSecretConfig);
        if (server) {
            setBwServer(server);
        }
    }
}

function setBwServer(server: string) {
    const currentServer = execSync("bw config server").toString();
    if (currentServer === server) {
        logger.info(`BW server already set to "${server}"`);
        return;
    }

    logger.info(`Setting BW server to "${server}"`);
    execSync(`bw config server ${server}`);
}

async function login({ username, password }: Credentials) {
    let loginResult: string;
    try {
        execSync(`bw login --check`);
        logger.info("Already logged in, unlocking vault");
        loginResult = execSync(`bw unlock ${password}`).toString();
    } catch (e) {
        logger.info("Logging in");
        username = await ensureUsername(username);
        loginResult = execSync(`bw login ${username} ${password}`).toString();
    }

    process.env.BW_SESSION = /SESSION="(.+?)"/.exec(loginResult)?.[1] ?? "";
    logger.info("Set BW_SESSION");
}

async function ensureUsername(username: string): Promise<string> {
    return username || process.env.BW_USERNAME || (await inquireUsername());
}

async function inquireUsername(): Promise<string> {
    const res = await inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter BW username",
        },
    ]);
    return res.username;
}

export function projectConfigExists(tree: Tree, root = ""): boolean {
    return tree.exists(projectConfigFilePath(root));
}

function projectConfigFilePath(root: string): string {
    return path.join(root, PROJECT_CONFIG_FILE);
}

export function getEnvContent(tree: Tree, root: string, stages: string[]): string {
    const config = readConfigFile(tree, projectConfigFilePath(root), zProjectSecretsConfig);
    const envs = Object.entries(config.env).map(([key, value]) => `${key}=${value}`);
    const secrets = Object.entries(config.secrets).flatMap(([collection, collectionConfig]) =>
        Object.entries(getSecrets(tree, root, collection, collectionConfig, stages)).map(
            ([key, value]) => `${key}=${value}`,
        ),
    );
    return envs.concat(secrets).join("\n");
}

function getSecrets(
    tree: Tree,
    root: string,
    collectionName: string,
    collectionConfig: SecretCollectionConfig,
    stages: string[],
): Record<string, string> {
    const secrets: Record<string, string> = {};
    collectionConfig.vars.forEach(envConfig => {
        const envName = typeof envConfig === "string" ? envConfig : envConfig.name;
        const secretName = collectionConfig.prefix ? `${collectionName}_${envName}` : envName;

        try {
            const secretValue = getSecret(
                collectionConfig.collectionId,
                getFieldName(envConfig),
                stages,
            );

            if (typeof envConfig !== "string" && envConfig.file) {
                tree.write(path.join(root, envConfig.file), secretValue.replace(/\\n/g, "\n"));
            } else {
                secrets[secretName] = secretValue;
            }
        } catch (e) {
            logger.warn(e);
        }
    });

    return secrets;
}

function getFieldName(envConfig: SecretEnvConfig): string {
    if (typeof envConfig === "string") {
        return envConfig.toLowerCase().replace(/_/g, "");
    }

    return envConfig.field || getFieldName(envConfig.name);
}

function getSecret(collectionId: string, field: string, stages: string[]): string {
    return getSecretContent(getCipherData(collectionId, stages), field);
}

function getCipherData(collectionId: string, stages: string[]): CipherData[] {
    return stages
        .map(stage => {
            const cacheKey = `${collectionId}-${stage}`;
            if (cipherDataCache.has(cacheKey)) {
                return cipherDataCache.get(cacheKey) as CipherData;
            }

            const result = JSON.parse(
                execSync(
                    `bw list items --collectionid ${collectionId} --search "${stage}"`,
                ).toString(),
            );

            const cipherData: CipherData = result[0];
            cipherDataCache.set(cacheKey, cipherData);
            return cipherData;
        })
        .filter(data => !!data);
}

function getSecretContent(items: CipherData[], field: string): string {
    for (const item of items) {
        const result =
            item.login && isLoginField(field) ? item.login[field] : getCustomItemField(item, field);
        if (result) {
            return result;
        }
    }

    throw new Error(`No secret found for field ${field}`);
}

function isLoginField(field: string): field is "username" | "password" | "totp" {
    return ["username", "password", "totp"].includes(field);
}

function getCustomItemField(item: CipherData, field: string): string | undefined {
    return item.fields?.find(f => f.name.toLowerCase() === field)?.value;
}

function readConfigFile<T extends ZodSchema>(tree: Tree, path: string, schema: T): z.infer<T> {
    const content = tree.read(path)?.toString();
    if (!content) {
        throw new Error("Config file not found");
    }

    return schema.parse(parseYaml(content));
}
