import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/astro.config.mjs", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("@cdw/monorepo/nx-plugins-astro", "", [
                    "build",
                    "serve",
                    "preview",
                ]),
            },
        },
    };
});
