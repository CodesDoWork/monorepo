import { getWorkspaceLayout, Tree } from "@nrwl/devkit";

export const getAppRoot = (tree: Tree, appName: string) =>
    `${getWorkspaceLayout(tree).appsDir}/${appName}`;
