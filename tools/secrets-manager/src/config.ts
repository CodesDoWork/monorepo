import { logger, Tree } from "@nx/devkit";
import { execSync } from "node:child_process";
import path from "node:path";
import { z, ZodSchema } from "zod";
import { Credentials, SecretConfig, zProjectSecretsConfig, zRootSecretConfig } from "./types";
import { CipherData } from "./types/bitwarden";

export const CONFIG_FILE = ".secrets.config.json";

const cipherDataCache = new Map<string, CipherData>();

export function setupBwCli(tree: Tree, credentials: Credentials) {
    setupWithRootConfig(tree);
    login(credentials);
    syncBw();
}

function syncBw() {
    logger.info("Syncing Vault");
    execSync("bw sync");
}

function setupWithRootConfig(tree: Tree) {
    if (tree.exists(CONFIG_FILE)) {
        const { server } = readConfigFile(zRootSecretConfig, tree);
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

function login({ username, password }: Credentials) {
    let loginResult: string;
    try {
        execSync(`bw login --check`);
        logger.info("Already logged in, unlocking vault");
        loginResult = execSync(`bw unlock ${password}`).toString();
    } catch (e) {
        logger.info("Logging in");
        loginResult = execSync(`bw login ${username} ${password}`).toString();
    }

    process.env.BW_SESSION = /SESSION="(.+?)"/.exec(loginResult)?.[1] ?? "";
    logger.info("Set BW_SESSION");
}

export function projectConfigExists(tree: Tree, root: string): boolean {
    return tree.exists(configFilePath(root));
}

function configFilePath(root: string): string {
    return path.join(root, CONFIG_FILE);
}

export function getEnvContent(tree: Tree, root: string, stage: string): string {
    const config = readConfigFile(zProjectSecretsConfig, tree, root);
    return Object.entries(config)
        .flatMap(([collectionId, secretConfigs]) =>
            secretConfigs.map(
                secretConfig =>
                    `${getSecretName(secretConfig)}=${getSecret(collectionId, getSecretField(secretConfig), stage)}`,
            ),
        )
        .join("\n");
}

function getSecretName(config: SecretConfig): string {
    if (typeof config === "string") {
        return config;
    }

    return config.name;
}

function getSecretField(config: SecretConfig): string {
    if (typeof config === "string") {
        return config.toLowerCase().replace(/_/g, "");
    }

    return config.field || getSecretField(config.name);
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

function readConfigFile<T extends ZodSchema>(schema: T, tree: Tree, root = ""): z.infer<T> {
    const content = tree.read(configFilePath(root))?.toString();
    if (!content) {
        throw new Error("Config file not found");
    }

    return schema.parse(JSON.parse(content));
}
