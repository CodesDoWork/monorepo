import type { PromiseExecutor } from "@nx/devkit";
import type { ExecutorSchema } from "./schema";
import { runComposeExecutor } from "./executor";

export const dockerComposeUpExecutor: PromiseExecutor<ExecutorSchema> = async (schema, context) => {
    schema.args = ["up", "--wait", ...(schema.args ?? [])];
    return runComposeExecutor(schema, context);
};

export default dockerComposeUpExecutor;
