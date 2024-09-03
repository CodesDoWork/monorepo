import { generateFiles, getProjects, logger, Tree } from "@nx/devkit";
import path from "node:path";
import { getEnvContent, projectConfigExists, setupBwCli } from "../../config";
import { EnvFilesGeneratorSchema } from "./schema";

export async function envFilesGenerator(tree: Tree, options: EnvFilesGeneratorSchema) {
    setupBwCli(tree, options);
    getProjects(tree).forEach(project => {
        if (projectConfigExists(tree, project.root)) {
            logger.info(`Generating env file for ${project.name}`);
            const content = getEnvContent(tree, project.root, options.stage);
            const fileOptions = { content };
            generateFiles(tree, path.join(__dirname, "files"), project.root, fileOptions);
        }
    });
}

export default envFilesGenerator;
