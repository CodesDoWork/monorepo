import { loadEnv } from "@codesdowork/nx-plugins-utils";

export function getBaseDockerVars() {
    const { IMAGE_BASE, PROJECT_VERSION } = loadEnv();
    return {
        IMAGE_BASE,
        PROJECT_VERSION: PROJECT_VERSION || "latest",
    };
}

export function dockerImage(serviceName: string) {
    const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
    return `${IMAGE_BASE}/${serviceName}:${PROJECT_VERSION}`;
}
