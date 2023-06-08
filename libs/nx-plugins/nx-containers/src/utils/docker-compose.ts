import { load } from "js-yaml";
import { existsSync, readFileSync } from "fs";
import { logWarn } from "./logging";

export const defaultComposeFile = "docker-compose.yml";

export const hasComposeServiceWithBuild = (
    serviceName: string,
    configFile = defaultComposeFile,
): boolean => {
    if (!existsSync(configFile)) {
        if (configFile !== defaultComposeFile) {
            logWarn(`Config file '${configFile}' not found!`);
        }
        return false;
    }

    const config = loadConfig(readFileSync(configFile).toString());
    return !!config.services[serviceName].build;
};

const loadConfig = (content: string): ComposeConfig => {
    const config = load(content);
    if (config !== null && typeof config === "object") {
        return config as ComposeConfig;
    } else {
        throw new Error("Invalid compose file!");
    }
};

type ComposeService = {
    build?: unknown;
    [key: string]: unknown;
};

type ComposeConfig = {
    services?: Record<string, ComposeService>;
    [key: string]: unknown;
};
