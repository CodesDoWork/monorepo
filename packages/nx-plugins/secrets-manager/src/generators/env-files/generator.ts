import type { BitwardenData } from "@cdw/monorepo/shared-bitwarden";
import type { Tree } from "@nx/devkit";
import type { EnvFilesGeneratorSchema } from "./schema";
import type { RootSecretsConfig } from "./types";
import { readdirSync } from "node:fs";
import path from "node:path";
import { BitwardenClient } from "@cdw/monorepo/shared-bitwarden";
import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import { BitwardenEnvGenerator } from "./bitwarden-env-generator";
import { getRootConfig, projectConfigExists } from "./config";

const git = simpleGit();

export async function envFilesGenerator(tree: Tree, options: EnvFilesGeneratorSchema) {
    const rootConfig = getRootConfig(tree);
    const generator = new BitwardenEnvGenerator(tree, rootConfig, options.stages);
    const bitwardenData = await getBitwardenData(rootConfig, options);
    await generator.prepare(bitwardenData);

    for (const dir of options.dirs) {
        await generateEnvFiles(tree, dir, options, generator);
    }
}

async function getBitwardenData(
    rootConfig: RootSecretsConfig,
    options: EnvFilesGeneratorSchema,
): Promise<BitwardenData> {
    await ensurePassword(options);
    const client = new BitwardenClient(rootConfig.server, options.email, options.password);
    await client.login();
    return client.sync();
}

async function generateEnvFiles(
    tree: Tree,
    root: string,
    options: EnvFilesGeneratorSchema,
    generator: BitwardenEnvGenerator,
) {
    if (projectConfigExists(tree, root) && options.dirs.includes(root)) {
        await generator.createEnvFile(root);
    }

    if (!options.recursive) {
        return;
    }

    const dirsToProcess = await getGitIncludedDirs(getChildDirs(root));
    options.dirs = options.dirs.concat(dirsToProcess);
    for (const dir of dirsToProcess) {
        await generateEnvFiles(tree, dir, options, generator);
    }
}

function getChildDirs(root: string): string[] {
    return readdirSync(root, { withFileTypes: true })
        .filter(child => child.isDirectory() && child.name !== ".git")
        .map(dir => path.join(root, dir.name));
}

async function getGitIncludedDirs(dirs: string[]): Promise<string[]> {
    if (!dirs.length) {
        return [];
    }

    const ignoredDirs = await git
        .checkIgnore(dirs)
        .then(ignoredDirs =>
            ignoredDirs.map(path.normalize).map(dirPath => dirPath.replace(/"/g, "")),
        );
    return dirs.filter(dir => !ignoredDirs.includes(dir));
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
            message: "Enter Bitwarden password",
        },
    ]);
    return res.password;
}

export default envFilesGenerator;
