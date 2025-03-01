import type { Tree } from "@nx/devkit";
import type {
    ProjectSecretsConfig,
    RootSecretsConfig,
} from "./types";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import {
    zProjectSecretsConfig,
    zRootSecretConfig,
} from "./types";

const ROOT_CONFIG_FILE = ".secrets.config.json";
const PROJECT_CONFIG_FILE = ".env.secure.yaml";

export function getRootConfig(tree: Tree): RootSecretsConfig {
    if (tree.exists(ROOT_CONFIG_FILE)) {
        return readRootConfig(tree);
    }

    throw new Error("Root config file not found");
}

function readRootConfig(tree: Tree): RootSecretsConfig {
    const content = tree.read(ROOT_CONFIG_FILE)?.toString();
    if (!content) {
        throw new Error("Config file not found");
    }

    return zRootSecretConfig.parse(parseYaml(content));
}

export function projectConfigExists(tree: Tree, root = ""): boolean {
    return tree.exists(projectConfigFilePath(root));
}

export function readConfigFile(tree: Tree, dir: string): ProjectSecretsConfig {
    const content = tree.read(projectConfigFilePath(dir))?.toString();
    if (!content) {
        throw new Error("Config file not found");
    }

    return zProjectSecretsConfig.parse(parseYaml(content));
}

function projectConfigFilePath(root: string): string {
    return root.endsWith(PROJECT_CONFIG_FILE) ? root : path.join(root, PROJECT_CONFIG_FILE);
}
