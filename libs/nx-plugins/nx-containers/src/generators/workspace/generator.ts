import { formatFiles, generateFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { configFile, loadWorkspaceConfig } from "../../config/config";
import { WorkspaceConfig } from "../../config/config.schema";
import { stringifyCleanObject } from "../../utils/object";
import { askBaseQuestions } from "./questions";

export default async function (tree: Tree) {
    const newConfig = await collectConfig(loadWorkspaceConfig(tree.root));
    tree.write(configFile, stringifyCleanObject(newConfig));
    generateFiles(tree, join(__dirname, "files"), "", {});

    await formatFiles(tree);
}

const collectConfig = async (oldConfig: WorkspaceConfig | null): Promise<WorkspaceConfig> => {
    const { base, organization } = await askBaseQuestions(oldConfig);

    return {
        base,
        organization,
    };
};
