import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/wrangler.toml", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("@cdw/monorepo/nx-plugins-wrangler", "wrangler-", ["delete"]),
            },
        },
    };
});
