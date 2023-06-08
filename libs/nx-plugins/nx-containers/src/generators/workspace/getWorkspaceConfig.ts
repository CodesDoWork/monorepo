import { loadWorkspaceConfig } from "../../config/config";
import { logError } from "../../utils/logging";
import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { exit } from "process";

export const getWorkspaceConfig = (tree: Tree): WorkspaceConfig => {
    const workspaceConfig = loadWorkspaceConfig(tree.root);
    if (!workspaceConfig) {
        logError(
            "No workspace config found! Please create on using 'nx g @codesdowork/nx-containers:workspace'",
        );

        exit(1);
    }

    return workspaceConfig;
};
