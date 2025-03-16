import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/vite.config.ts", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("@cdw/monorepo/nx-plugins-vite", "", [
                    "build",
                    "serve",
                    "preview",
                ]),
            },
        },
    };
});
