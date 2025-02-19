import { loadEnv } from "nx-plugins-utils";

export function getBaseDockerVars() {
    const { IMAGE_BASE, PROJECT_VERSION, DOCKER_PROXY } = loadEnv();
    return {
        IMAGE_BASE: process.env.IMAGE_BASE || IMAGE_BASE,
        PROJECT_VERSION: process.env.PROJECT_VERSION || PROJECT_VERSION || "latest",
        DOCKER_PROXY: process.env.DOCKER_PROXY || DOCKER_PROXY || "docker.io",
        CI: process.env.CI,
    };
}

export function dockerImage(serviceName: string, tag?: string) {
    const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
    return `${IMAGE_BASE}/${serviceName}:${tag || PROJECT_VERSION}`;
}
