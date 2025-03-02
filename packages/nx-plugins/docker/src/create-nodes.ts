import { createNodesForProjects, getExecutors } from "@cdw/monorepo/nx-plugins-utils";

export const createNodes = createNodesForProjects("**/Dockerfile", ({ root }) => ({
    projects: {
        [root]: {
            targets: getExecutors("@cdw/monorepo/nx-plugins-docker", "docker-", [
                "build",
                "pull",
                "push",
                "tag",
                "trivy",
                "scout",
            ]),
        },
    },
}));
