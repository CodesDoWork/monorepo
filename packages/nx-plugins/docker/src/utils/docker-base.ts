import type { Env } from "@cdw/monorepo/nx-plugins-utils";
import { loadEnv } from "@cdw/monorepo/nx-plugins-utils";

export function dockerImage(serviceName: string, tag?: string) {
    const { IMAGE_BASE, PROJECT_VERSION } = getBaseDockerVars();
    return `${IMAGE_BASE}/${serviceName}:${tag || PROJECT_VERSION}`;
}

export function getBaseDockerVars() {
    const env = loadEnv();
    return {
        IMAGE_BASE: getImageBase(env),
        PROJECT_VERSION: getProjectVersion(env),
        DOCKER_PROXY: getDockerProxy(env),
        CI: process.env.CI,
    };
}

function getImageBase(env: Env) {
    const varName = "IMAGE_BASE";
    return process.env[varName] || env[varName];
}

function getProjectVersion(env: Env) {
    const varName = "PROJECT_VERSION";
    return process.env[varName] || env[varName] || "latest";
}

function getDockerProxy(env: Env) {
    const varName = "DOCKER_PROXY";
    return process.env[varName] || env[varName] || "";
}
