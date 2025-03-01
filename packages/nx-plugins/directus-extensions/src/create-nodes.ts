import { readFileSync } from "node:fs";
import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

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
                    targets: getExecutors("@cdw/monorepo/nx-plugins-directus-extensions", "", ["build", "serve"]),
                },
            },
        };
    },
);
