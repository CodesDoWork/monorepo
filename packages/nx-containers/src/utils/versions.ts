import { readJsonFile } from "@nrwl/devkit";
import { join } from "path";

export const versions = (dir: string) => {
    const version = readJsonFile(join(dir, "package.json")).version as string;
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
