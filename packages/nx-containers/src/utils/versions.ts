import { readJsonFile } from "@nrwl/devkit";

export const versions = () => {
    const version = readJsonFile("package.json").version as string;
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
