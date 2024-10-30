import { createNodesForProjects, getExecutors } from "@codesdowork/nx-plugins-utils";
import { readFileSync } from "node:fs";

export const createNodes = createNodesForProjects(
    "**/package.json",
    ({ projectConfigurationFile, root }) => {
        const packageJson = JSON.parse(readFileSync(projectConfigurationFile).toString());
        if (!("directus:extension" in packageJson)) {
            return {};
        }

        return {
            projects: {
                [root]: {
                    targets: getExecutors("nx-plugins-directus-extensions", "", ["build", "serve"]),
                },
            },
        };
    },
);
