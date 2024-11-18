import { ExecutorContext } from "@nx/devkit";

export function projectRoot(context: ExecutorContext): string {
    const root = context.projectsConfigurations.projects[context.projectName ?? ""]?.root;
    if (!root) {
        throw new Error(`Could not find project root for ${context.projectName}`);
    }

    return root;
}
