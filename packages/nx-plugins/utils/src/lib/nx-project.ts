import type { ExecutorContext, ProjectConfiguration } from "@nx/devkit";

export function projectRoot(context: ExecutorContext): string {
    const { root } = getProjectConfig(context);
    return root;
}

export function getProjectConfig(context: ExecutorContext): ProjectConfiguration {
    const conf = context.projectsConfigurations.projects[context.projectName ?? ""];
    if (!conf) {
        throw new Error(`Could not find project configuration for ${context.projectName}`);
    }

    return conf;
}
