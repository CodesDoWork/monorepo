import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";
import { configFile } from "./config";

export const createNodes = createNodesForProjects(`**/${configFile}`, ({ root }) => {
    return {
        projects: {
            [root]: {
                targets: getExecutors("@cdw/monorepo/nx-plugins-latex", "", ["build", "serve"]),
            },
        },
    };
});
