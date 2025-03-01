import type { ExecutorContext } from "@nx/devkit";
import { loadEnv, projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { searchNextDir } from "@cdw/monorepo/shared-utils";

export interface ServiceInfo {
    composeDir: string;
    stackName?: string;
    stack_suffix: string;
    service: string;
}

export function getServiceInfo(context: ExecutorContext): ServiceInfo {
    const composeDir = getComposeDirForContext(context);
    const composeEnv = loadEnv(composeDir);
    const composePath = composeDir.split("/");
    const service = projectRoot(context).split("/").slice(composePath.length).join("-");
    return {
        composeDir,
        stackName: composeEnv.STACK_NAME,
        stack_suffix: composePath.slice(1).join("_"),
        service,
    };
}

export function getComposeDirForContext(context: ExecutorContext): string {
    return searchNextDir(projectRoot(context), ["docker-compose.yml", "docker-compose.yaml"]);
}

export function getServiceNetwork(context: ExecutorContext, network = "default"): string {
    const { stack_suffix, stackName } = getServiceInfo(context);
    const { STACK_NAME } = loadEnv();
    const stack = stackName ?? `${STACK_NAME}_${stack_suffix}`;
    return `${stack}_${network}`;
}
