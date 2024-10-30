import { createNodesForProjects, getExecutors } from "@codesdowork/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/.lighthouserc.json", ({ root }) => ({
    projects: {
        [root]: {
            targets: getExecutors("nx-plugins-lighthouse", "", ["lighthouse"]),
        },
    },
}));
