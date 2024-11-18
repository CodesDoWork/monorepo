import { createNodesForProjects } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/svelte.config.js", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: {
                    "svelte-check": { executor: "nx-plugins-svelte:check", dependsOn: ["build"] },
                },
            },
        },
    };
});
