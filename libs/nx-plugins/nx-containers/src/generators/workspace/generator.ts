import { formatFiles, generateFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { configFile, loadWorkspaceConfig } from "../../config/config";
import { WorkspaceConfig } from "../../config/config.schema";
import { stringifyCleanObject } from "../../utils/object";
import { defaultComposeFile } from "../../utils/docker-compose";
import { askBaseQuestions, askForExtensions } from "./questions";

export default async function (tree: Tree) {
    const newConfig = await collectConfig(loadWorkspaceConfig(tree.root));
    if (newConfig.composeFile === defaultComposeFile) {
        delete newConfig.composeFile;
    }

    tree.write(configFile, stringifyCleanObject(newConfig));
    generateFiles(tree, join(__dirname, "files"), "", {});

    await formatFiles(tree);
}

const collectConfig = async (oldConfig: WorkspaceConfig | null): Promise<WorkspaceConfig> => {
    const { base, os, organization, composeFile } = await askBaseQuestions(oldConfig);
    const { baseExtensions, workspaceExtensions, devExtensions } = await askForExtensions(
        oldConfig,
        os,
    );

    return {
        base,
        os,
        organization,
        baseExtensions,
        workspaceExtensions,
        devExtensions,
        composeFile,
    };
};
