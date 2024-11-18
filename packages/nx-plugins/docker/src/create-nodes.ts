import { createNodesForProjects, getExecutors } from "nx-plugins-utils";

export const createNodes = createNodesForProjects("**/Dockerfile", ({ root }) => ({
    projects: {
        [root]: {
            targets: getExecutors("nx-plugins-docker", "docker-", [
                "build",
                "pull",
                "push",
                "tag",
                "trivy",
            ]),
        },
    },
}));
