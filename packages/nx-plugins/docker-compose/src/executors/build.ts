import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposeBuildExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["build", ...(args ?? [])] }, context);
};

export default dockerComposeBuildExecutor;
