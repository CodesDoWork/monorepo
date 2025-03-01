import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposePushExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["push", ...(args ?? [])] }, context);
};

export default dockerComposePushExecutor;
