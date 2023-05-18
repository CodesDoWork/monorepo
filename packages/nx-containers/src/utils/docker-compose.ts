import { Tree } from "@nrwl/devkit";
import { load, dump } from "js-yaml";
import { existsSync, readFileSync } from "fs";
import { logWarn } from "./logging";

export const defaultComposeFile = "docker-compose.yml";

export type ComposeService = {
    build?:
        | string
        | {
              context: string;
              dockerfile: string;
          };
    container_name?: string;
    image?: string;
    [key: string]: unknown;
};

type ComposeConfig = {
    services?: Record<string, ComposeService>;
    [key: string]: unknown;
};

export const addComposeService = (
    tree: Tree,
    serviceName: string,
    service: ComposeService,
    composeFile = defaultComposeFile,
) => {
    ensureComposeFile(tree);
    const config = loadConfig(tree.read(composeFile).toString());
    if (!config.services[serviceName]) {
        config.services[serviceName] = service;
        saveConfig(tree, config, composeFile);
    }
};

export const getComposeService = (
    serviceName: string,
    configFile = defaultComposeFile,
): ComposeService | undefined => {
    if (!existsSync(configFile)) {
        if (configFile !== defaultComposeFile) {
            logWarn(`Config file '${configFile}' not found!`);
        }
        return undefined;
    }

    const config = loadConfig(readFileSync(configFile).toString());
    return config.services[serviceName];
};

const loadConfig = (content: string): ComposeConfig => {
    const config = load(content);
    if (config !== null && typeof config === "object") {
        return config as ComposeConfig;
    } else {
        throw new Error("Invalid compose file!");
    }
};

const saveConfig = (tree: Tree, config: ComposeConfig, composeFile = defaultComposeFile) => {
    tree.write(composeFile, dump(config));
};

const ensureComposeFile = (tree: Tree, composeFile = defaultComposeFile) => {
    if (tree.exists(composeFile)) {
        const config = loadConfig(tree.read(composeFile).toString());
        if (!config.services) {
            config.services = {};
            saveConfig(tree, config, composeFile);
        }
    } else {
        saveConfig(tree, { services: {} }, composeFile);
    }
};
