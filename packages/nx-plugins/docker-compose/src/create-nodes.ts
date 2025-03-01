import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/docker-compose.yaml", ({ root }) => ({
    projects: {
        [root]: {
            targets: getExecutors("@cdw/monorepo/nx-plugins-docker-compose", "docker-compose-", [
                "build",
                "down",
                "pull",
                "push",
                "up",
            ]),
        },
    },
}));
