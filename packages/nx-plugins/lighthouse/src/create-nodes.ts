import { readFileSync } from "node:fs";
import { createNodesForProjects } from "nx-plugins-utils";
import { zLighthouseExecutorSchema } from "./schema";

export const createNodes = createNodesForProjects(
    "**/.lighthouserc.json",
    ({ projectConfigurationFile, root }) => ({
        projects: {
            [root]: {
                targets: {
                    lighthouse: {
                        executor: "nx-plugins-lighthouse:lighthouse",
                        options: readConfig(projectConfigurationFile),
                    },
                },
            },
        },
    }),
);

function readConfig(configFile: string) {
    return zLighthouseExecutorSchema.parse(
        JSON.parse(readFileSync(configFile, "utf-8").toString()),
    );
}