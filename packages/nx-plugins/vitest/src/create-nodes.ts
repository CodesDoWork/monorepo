import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects(
    "**/tsconfig.json",
    ({ projectConfigurationFile, root }) => {
        if (projectConfigurationFile === "tsconfig.json") {
            return {};
        }

        return {
            projects: {
                [root]: {
                    targets: getExecutors("nx-plugins-vitest", "", ["test"]),
                },
            },
        };
    },
);
