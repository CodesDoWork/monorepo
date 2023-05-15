import path, { join } from "path";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import ejs from "ejs";
import { logError } from "./logging";
import { Tree } from "@nrwl/devkit";

export const joinTruthy = (...args: string[]) => join(...args.filter(Boolean));

export const generateFilesInstant = (
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
            newContent = ejs.render(template, substitutions, {});
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
    const relativeFromSrcFolder = path.relative(srcFolder, filePath);
    let computedPath = path.join(target, relativeFromSrcFolder);
    if (computedPath.endsWith(".template")) {
        computedPath = computedPath.substring(0, computedPath.length - 9);
    }

    Object.entries(substitutions).forEach(([propertyName, value]) => {
        computedPath = computedPath.split(`__${propertyName}__`).join(value);
    });

    return computedPath;
};
