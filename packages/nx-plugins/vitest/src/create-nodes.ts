import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects(
    "**/tsconfig.json",
    ({ projectConfigurationFile, root }) => {
        if (projectConfigurationFile === "tsconfig.json") {
            return {};
        }

        return {
            projects: {
                [root]: {
                    targets: getExecutors("@cdw/monorepo/nx-plugins-vitest", "", ["test"]),
                },
            },
        };
    },
);
