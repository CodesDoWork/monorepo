import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/codegen.ts", ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("@cdw/monorepo/nx-plugins-codegen", "", ["codegen"]),
            },
        },
    };
});
