import { loadEnv, projectRoot } from "@codesdowork/nx-plugins-utils";
import { ExecutorContext } from "@nx/devkit";
import { existsSync } from "fs";
import path from "node:path";

export interface ServiceInfo {
    composeDir: string;
    stack_suffix: string;
    service: string;
}

export function getServiceInfo(context: ExecutorContext): ServiceInfo {
    const composeDir = getComposeDirForContext(context);
    const composePath = composeDir.split("/");
    const service = projectRoot(context).split("/").slice(composePath.length).join("-");
    return {
        composeDir,
        stack_suffix: composePath.slice(1).join("_"),
        service,
    };
}

export function getComposeDirForContext(context: ExecutorContext): string {
    return searchNextComposeDir(projectRoot(context));
}

export function getServiceNetwork(context: ExecutorContext, network = "default"): string {
    const { stack_suffix } = getServiceInfo(context);
    const { STACK_NAME } = loadEnv();
    return `${STACK_NAME}_${stack_suffix}_${network}`;
}

export function searchNextComposeDir(startDir: string): string {
    const composeFiles = ["docker-compose.yml", "docker-compose.yaml"];
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        for (const composeFile of composeFiles) {
            const filePath = path.join(currentDir, composeFile);
            if (existsSync(filePath)) {
                return currentDir;
            }
        }
        currentDir = path.dirname(currentDir);
    }

    return currentDir;
}
