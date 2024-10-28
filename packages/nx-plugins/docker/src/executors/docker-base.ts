import { ExecutorContext } from "@nx/devkit";
import { configDotenv } from "dotenv";

export function getBaseVars(context: ExecutorContext) {
    configDotenv();
    const { IMAGE_BASE } = process.env;
    const PROJECT_VERSION = process.env.PROJECT_VERSION || "latest";
    const projectRoot = context.projectsConfigurations.projects[context.projectName ?? ""].root;

    return {
        IMAGE_BASE,
        PROJECT_VERSION,
        projectRoot,
    };
}
