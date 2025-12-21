import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposePushExecutor: PromiseExecutor<ExecutorSchema> = async (
    schema,
    context,
) => {
    schema.args = ["push", ...(schema.args ?? [])];
    return runComposeExecutor(schema, context);
};

export default dockerComposePushExecutor;
