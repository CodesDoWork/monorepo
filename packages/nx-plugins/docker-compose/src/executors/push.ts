import { PromiseExecutor } from "@nx/devkit";
import { runComposeExecutor } from "./executor";
import { ExecutorSchema } from "./schema";

export const dockerComposePushExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["push", ...(args ?? [])] }, context);
};

export default dockerComposePushExecutor;
