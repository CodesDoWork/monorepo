import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposeBuildExecutor: PromiseExecutor<ExecutorSchema> = async (
    schema,
    context,
) => {
    schema.args = ["build", ...(schema.args ?? [])];
    return runComposeExecutor(schema, context);
};

export default dockerComposeBuildExecutor;
