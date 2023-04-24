import { Tree } from "@nrwl/devkit";
import { load, dump } from "js-yaml";

const composeFile = "docker-compose.yml";

export type ComposeService = {
    build:
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

export const addComposeService = (tree: Tree, serviceName: string, service: ComposeService) => {
    ensureComposeFile(tree);
    const config = loadConfig(tree);
    if (!config.services[serviceName]) {
        config.services[serviceName] = service;
        saveConfig(tree, config);
    }
};

const loadConfig = (tree: Tree): ComposeConfig => {
    const contents = tree.read(composeFile).toString();
    const config = load(contents);
    if (config !== null && typeof config === "object") {
        return config as ComposeConfig;
    } else {
        throw new Error(`Invalid ${composeFile}!`);
    }
};

const saveConfig = (tree: Tree, config: ComposeConfig) => {
    tree.write(composeFile, dump(config));
};

const ensureComposeFile = (tree: Tree) => {
    if (tree.exists(composeFile)) {
        const config = loadConfig(tree);
        if (!config.services) {
            config.services = {};
            saveConfig(tree, config);
        }
    } else {
        saveConfig(tree, { services: {} });
    }
};
