import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/docker-compose.yaml", ({ root }) => ({
    projects: {
        [root]: {
            targets: getExecutors("nx-plugins-docker-compose", "docker-compose", [
                "build",
                "down",
                "pull",
                "push",
                "up",
            ]),
        },
    },
}));
