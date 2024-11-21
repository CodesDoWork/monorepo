import { generateFiles, logger, Tree } from "@nx/devkit";
import inquirer from "inquirer";
import { readdirSync } from "node:fs";
import path from "node:path";
import { simpleGit } from "simple-git";
import { getEnvContent, projectConfigExists, setupBwCli } from "../../config";
import { EnvFilesGeneratorSchema } from "./schema";

const git = simpleGit();

export async function envFilesGenerator(tree: Tree, options: EnvFilesGeneratorSchema) {
    await ensurePassword(options);
    await setupBwCli(tree, options);
    for (const dir of options.dirs) {
        await generateEnvFiles(tree, dir, options);
    }
}

async function generateEnvFiles(tree: Tree, root: string, options: EnvFilesGeneratorSchema) {
    if (projectConfigExists(tree, root) && options.dirs.includes(root)) {
        createEnvFile(tree, root, options);
    }

    if (!options.recursive) {
        return;
    }

    const dirs = readdirSync(root, { withFileTypes: true })
        .filter(child => child.isDirectory() && child.name !== ".git")
        .map(dir => path.join(root, dir.name));
    if (!dirs.length) {
        return;
    }

    const ignoredDirs = await git
        .checkIgnore(dirs)
        .then(ignoredDirs =>
            ignoredDirs.map(path.normalize).map(dirPath => dirPath.replace(/"/g, "")),
        );
    const dirsToProcess = dirs.filter(dir => !ignoredDirs.includes(dir));
    options.dirs = options.dirs.concat(dirsToProcess);
    for (const dir of dirsToProcess) {
        await generateEnvFiles(tree, dir, options);
    }
}

function createEnvFile(tree: Tree, root: string, options: EnvFilesGeneratorSchema) {
    logger.info(`Generating env file for ${path.relative(tree.root, root) || "root"}`);
    const content = getEnvContent(tree, root, options.stages);
    const fileOptions = { content };
    generateFiles(tree, path.join(__dirname, "files"), root, fileOptions);
}

async function ensurePassword(options: EnvFilesGeneratorSchema) {
    if (!options.password) {
        options.password = process.env.BW_PASSWORD || (await inquirePassword());
    }
}

async function inquirePassword(): Promise<string> {
    const res = await inquirer.prompt([
        {
            name: "password",
            type: "password",
            message: "Enter BW password",
        },
    ]);
    return res.password;
}

export default envFilesGenerator;
