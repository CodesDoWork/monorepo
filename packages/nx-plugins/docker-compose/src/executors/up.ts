import { PromiseExecutor } from "@nx/devkit";
import { runComposeExecutor } from "./executor";
import { ExecutorSchema } from "./schema";

export const dockerComposeUpExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["up", "--wait", ...(args ?? [])] }, context);
};

export default dockerComposeUpExecutor;
