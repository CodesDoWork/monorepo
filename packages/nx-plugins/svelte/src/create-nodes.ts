import { createNodesForProjects } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/svelte.config.js", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: {
                    "svelte-check": {
                        executor: "@cdw/monorepo/nx-plugins-svelte:check",
                        dependsOn: ["build"],
                        inputs: ["production", "^production"],
                        cache: true,
                    },
                },
            },
        },
    };
});
