import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposeDownExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["down", ...(args ?? [])] }, context);
};

export default dockerComposeDownExecutor;
