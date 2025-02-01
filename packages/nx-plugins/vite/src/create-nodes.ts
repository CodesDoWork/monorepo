import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/vite.config.ts", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-vite", "", ["build", "serve", "preview"]),
            },
        },
    };
});
