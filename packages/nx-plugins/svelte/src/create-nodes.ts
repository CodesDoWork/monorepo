import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/svelte.config.js", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-svelte", "", ["svelte-check"]),
            },
        },
    };
});
