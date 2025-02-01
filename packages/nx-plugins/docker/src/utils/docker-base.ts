import { loadEnv } from "nx-plugins-utils";

export function getBaseDockerVars() {
    const { IMAGE_BASE, PROJECT_VERSION } = loadEnv();
    return {
        IMAGE_BASE: process.env.IMAGE_BASE || IMAGE_BASE,
        PROJECT_VERSION: process.env.PROJECT_VERSION || PROJECT_VERSION || "latest",
        CI: process.env.CI,
    };
}

export function dockerImage(serviceName: string, tag?: string) {
    const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
    return `${IMAGE_BASE}/${serviceName}:${tag || PROJECT_VERSION}`;
}
