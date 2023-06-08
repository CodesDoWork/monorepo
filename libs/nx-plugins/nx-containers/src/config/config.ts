import { AppConfig, WorkspaceConfig } from "./config.schema";
import { existsSync } from "fs";
import { join } from "path";
import { readJsonFile } from "@nrwl/devkit";

export const configFile = "container.config.json";

export const loadWorkspaceConfig = (dir: string): WorkspaceConfig | null => loadConfig(dir);
export const loadAppConfig = (dir: string): AppConfig | null => loadConfig(dir);

const loadConfig = <T>(dir: string): T | null => {
    const path = join(dir, configFile);
    return existsSync(path) ? (readJsonFile(path) as T) : null;
};
