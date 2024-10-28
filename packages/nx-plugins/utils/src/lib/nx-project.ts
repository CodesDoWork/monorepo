import { ExecutorContext } from "@nx/devkit";

export function projectRoot(context: ExecutorContext): string {
    return context.projectsConfigurations.projects[context.projectName ?? ""].root;
}
