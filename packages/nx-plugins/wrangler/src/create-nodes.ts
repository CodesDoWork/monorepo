import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/wrangler.toml", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-wrangler", "wrangler-", ["delete"]),
            },
        },
    };
});
