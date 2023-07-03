import { generateFiles, Tree } from "@nrwl/devkit";
import { join, relative } from "path";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { logError } from "../../utils/logging";
import { render } from "ejs";
import { DockerfileArea } from "../../config/config.schema";

export const convertTemplates = (
    tree: Tree,
    target: string,
    kind: DockerfileKind,
    options: Record<string, unknown>,
    isInstant = false,
    appVariant?: string,
) => {
    Object.values(DockerfileArea).forEach(area => {
        if (area in options) {
            options[area] = `\n${options[area]}\n`;
        } else {
            options[area] = "";
        }
    });

    const generate = isInstant ? generateFilesInstant : generateFiles;
    generate(tree, join(__dirname, "files", kind, appVariant || ""), target, {
        template: "",
        argsAndEnvs: makeArgsAndEnvs(),
        ...options,
    });
};

const generateFilesInstant = (
    tree: Tree,
    srcFolder: string,
    target: string,
    substitutions: Record<string, string>,
) => {
    readdirSync(srcFolder).forEach(filePath => {
        let newContent;
        const computedPath = computePath(srcFolder, target, filePath, substitutions);
        const template = readFileSync(join(srcFolder, filePath)).toString();
        try {
            newContent = render(template, substitutions, {});
        } catch (e) {
            logError(`Error in ${filePath.replace(`${tree.root}/`, "")}:`);
            throw e;
        }

        target && mkdirSync(target, { recursive: true });
        writeFileSync(join(target, computedPath), newContent);
    });
};

const computePath = (
    srcFolder: string,
    target: string,
    filePath: string,
    substitutions: Record<string, string>,
) => {
    const relativeFromSrcFolder = relative(srcFolder, filePath);
    let computedPath = join(target, relativeFromSrcFolder);
    if (computedPath.endsWith(".template")) {
        computedPath = computedPath.substring(0, computedPath.length - 9);
    }

    Object.entries(substitutions).forEach(([propertyName, value]) => {
        computedPath = computedPath.split(`__${propertyName}__`).join(value);
    });

    return computedPath;
};

const makeArgsAndEnvs = () => ["ARG VERSION", "ENV VERSION $VERSION"].join("\n");

export enum DockerfileKind {
    Base = "base",
    Workspace = "workspace",
    App = "app",
    Dev = "dev",
}
