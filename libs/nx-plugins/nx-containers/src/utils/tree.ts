import { getProjects, Tree } from "@nrwl/devkit";

export const getAppRoot = (tree: Tree, appName: string): string => {
    const projects = getProjects(tree);
    return projects.get(appName).root;
};
