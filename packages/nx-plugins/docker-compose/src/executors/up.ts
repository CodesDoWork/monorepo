import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposeUpExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["up", "--wait", ...(args ?? [])] }, context);
};

export default dockerComposeUpExecutor;
