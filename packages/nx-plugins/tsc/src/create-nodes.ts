import { createNodesForProjects } from "@codesdowork/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/tsconfig.json", ({ root }) => ({
    projects: {
        [root]: {
            targets: {
                build: {
                    executor: "@nx/js:tsc",
                    options: {
                        outputPath: "dist/{projectRoot}",
                        main: "{projectRoot}/src/index.ts",
                        tsConfig: "{projectRoot}/tsconfig.json",
                    },
                },
            },
        },
    },
}));
