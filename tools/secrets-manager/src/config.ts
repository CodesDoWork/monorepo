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
    execSync("bw sync");
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

export function getEnvContent(tree: Tree, root: string, stage: string): string {
    const config = readConfigFile(tree, projectConfigFilePath(root), zProjectSecretsConfig);
    const envs = Object.entries(config.env).map(([key, value]) => `${key}=${value}`);
    const secrets = Object.entries(config.secrets).flatMap(([collection, collectionConfig]) =>
        Object.entries(getSecrets(collection, collectionConfig, stage)).map(
            ([key, value]) => `${key}=${value}`,
        ),
    );
    return envs.concat(secrets).join("\n");
}

function getSecrets(
    collectionName: string,
    collectionConfig: SecretCollectionConfig,
    stage: string,
): Record<string, string> {
    const secrets: Record<string, string> = {};
    collectionConfig.vars.forEach(envConfig => {
        const envName = typeof envConfig === "string" ? envConfig : envConfig.name;
        const secretName = collectionConfig.prefix ? `${collectionName}_${envName}` : envName;

        try {
            secrets[secretName] = getSecret(
                collectionConfig.collectionId,
                getFieldName(envConfig),
                stage,
            );
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

function getSecret(collectionId: string, field: string, stage: string): string {
    return getSecretContent(getCipherData(collectionId, stage), field);
}

function getCipherData(collectionId: string, item: string): CipherData {
    const cacheKey = `${collectionId}-${item}`;
    if (cipherDataCache.has(cacheKey)) {
        return cipherDataCache.get(cacheKey) as CipherData;
    }

    const result: CipherData[] = JSON.parse(
        execSync(`bw list items --collectionid ${collectionId} --search "${item}"`).toString(),
    );
    if (!result.length) {
        throw Error(`Secret ${item} not found in collection ${collectionId}`);
    }

    const cipherData = result[0];
    cipherDataCache.set(cacheKey, cipherData);

    return cipherData;
}

function getSecretContent(item: CipherData, field: string): string {
    return item.login && isLoginField(field) ? item.login[field] : getCustomItemField(item, field);
}

function isLoginField(field: string): field is "username" | "password" | "totp" {
    return ["username", "password", "totp"].includes(field);
}

function getCustomItemField(item: CipherData, field: string): string {
    const itemField = item.fields?.find(f => f.name.toLowerCase() === field);
    if (!itemField) {
        throw Error(
            `Field ${field} not found in secret ${item.name} of collection ${item.collectionIds?.[0]}`,
        );
    }

    return itemField.value;
}

function readConfigFile<T extends ZodSchema>(tree: Tree, path: string, schema: T): z.infer<T> {
    const content = tree.read(path)?.toString();
    if (!content) {
        throw new Error("Config file not found");
    }

    return schema.parse(parseYaml(content));
}
