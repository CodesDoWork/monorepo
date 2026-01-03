import type { PromiseExecutor } from "@nx/devkit";
import type { LatexExecutorSchema } from "./schema";
import { runLatexExecutor } from "./executor";

export const runLatexWatchExecutor: PromiseExecutor<LatexExecutorSchema> = async (
    schema,
    context,
) => {
    schema.args = ["-pvc", ...(schema.args ?? [])];
    return runLatexExecutor(schema, context);
};

export default runLatexWatchExecutor;
