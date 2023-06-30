import { getProjects, Tree } from "@nrwl/devkit";

export const getAppRoot = (tree: Tree, appName: string): string => {
    const projects = getProjects(tree);
    const root = projects.get(appName)?.root;
    if (!root) {
        throw new Error("App root not found.");
    }

    return root;
};
