import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/astro.config.mjs", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-astro", "", ["build", "serve", "preview"]),
            },
        },
    };
});
