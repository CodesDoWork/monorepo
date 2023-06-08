import { readJsonFile } from "@nrwl/devkit";
import { join } from "path";
import { existsSync } from "fs";

export const getAppVersions = (appRoot: string, root: string) => {
    const packageJson = (dir: string) => join(dir, "package.json");
    const path = existsSync(packageJson(appRoot)) ? appRoot : root;

    const version = readJsonFile(packageJson(path)).version as string;
    const [major, minor, rest] = version.split(".");
    const [patch, other] = rest.split("-");

    return {
        version,
        major,
        minor,
        patch,
        other,
    };
};
