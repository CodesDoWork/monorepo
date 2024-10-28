import { PromiseExecutor } from "@nx/devkit";
import { runDockerComposeCommand } from "../../run-command";
import { ExecutorSchema } from "../schema";

export const runComposeExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    try {
        await runDockerComposeCommand(
            [...(args ?? []), context.projectName],
            context.projectsConfigurations.projects[context.projectName ?? ""].root,
        );
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runComposeExecutor;
