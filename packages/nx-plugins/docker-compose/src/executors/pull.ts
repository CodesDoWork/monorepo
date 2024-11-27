import { PromiseExecutor } from "@nx/devkit";
import { runComposeExecutor } from "./executor";
import { ExecutorSchema } from "./schema";

export const dockerComposePullExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["pull", ...(args ?? [])] }, context);
};

export default dockerComposePullExecutor;
