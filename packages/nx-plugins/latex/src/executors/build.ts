import type { PromiseExecutor } from "@nx/devkit";
import type { LatexExecutorSchema } from "./schema";
import { runLatexExecutor } from "./executor";

export const runLatexBuildExecutor: PromiseExecutor<LatexExecutorSchema> = async (
    schema,
    context,
) => {
    schema.args = [...(schema.args ?? [])];
    return runLatexExecutor(schema, context);
};

export default runLatexBuildExecutor;
