import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/codegen.ts", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-codegen", "", ["codegen"]),
            },
        },
    };
});
