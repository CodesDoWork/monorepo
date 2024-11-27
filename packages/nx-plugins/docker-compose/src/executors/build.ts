import { PromiseExecutor } from "@nx/devkit";
import { runComposeExecutor } from "./executor";
import { ExecutorSchema } from "./schema";

export const dockerComposeBuildExecutor: PromiseExecutor<ExecutorSchema> = async (
    { args },
    context,
) => {
    return runComposeExecutor({ args: ["build", ...(args ?? [])] }, context);
};

export default dockerComposeBuildExecutor;
