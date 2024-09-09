import { generateFiles, getProjects, logger, Tree } from "@nx/devkit";
import inquirer from "inquirer";
import path from "node:path";
import { getEnvContent, projectConfigExists, setupBwCli } from "../../config";
import { EnvFilesGeneratorSchema } from "./schema";

export async function envFilesGenerator(tree: Tree, options: EnvFilesGeneratorSchema) {
    await ensurePassword(options);
    setupBwCli(tree, options);
    getProjects(tree).forEach(project => {
        if (projectConfigExists(tree, project.root)) {
            createEnvFile(tree, project.name || project.root, project.root, options);
        }
    });

    if (projectConfigExists(tree)) {
        createEnvFile(tree, "root", "", options);
    }
}

function createEnvFile(tree: Tree, name: string, root: string, options: EnvFilesGeneratorSchema) {
    logger.info(`Generating env file for ${name}`);
    const content = getEnvContent(tree, root, options.stage);
    const fileOptions = { content };
    generateFiles(tree, path.join(__dirname, "files"), root, fileOptions);
}

async function ensurePassword(options: EnvFilesGeneratorSchema): Promise<void> {
    if (!options.password) {
        options.password = process.env.BW_PASSWORD || (await inquirePassword());
    }
}

function inquirePassword(): Promise<string> {
    return inquirer
        .prompt([
            {
                name: "password",
                type: "password",
                message: "Enter BW password",
            },
        ])
        .then(res => res.password);
}

export default envFilesGenerator;
