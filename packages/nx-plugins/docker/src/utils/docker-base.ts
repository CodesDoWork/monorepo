import { loadAndExpandDotEnvFile } from "nx/src/tasks-runner/task-env";

export function getBaseDockerVars() {
    const loadedEnv: Record<string, string> = { PROJECT_VERSION: "latest" };
    loadAndExpandDotEnvFile(".env", loadedEnv);
    const { IMAGE_BASE, PROJECT_VERSION } = loadedEnv;

    return {
        IMAGE_BASE,
        PROJECT_VERSION,
    };
}

export function dockerImage(serviceName: string) {
    const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
    return `${IMAGE_BASE}/${serviceName}:${PROJECT_VERSION || "latest"}`;
}
