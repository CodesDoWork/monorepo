import { PromiseExecutor } from "@nx/devkit";
import { runComposeExecutor } from "./executor";
import { ExecutorSchema } from "./schema";

export const dockerComposeDownExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["down", ...(args ?? [])] }, context);
};

export default dockerComposeDownExecutor;
