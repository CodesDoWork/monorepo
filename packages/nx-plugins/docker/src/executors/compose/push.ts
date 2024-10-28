import { PromiseExecutor } from "@nx/devkit";
import { ExecutorSchema } from "../schema";
import { runComposeExecutor } from "./executor";

const runExecutor: PromiseExecutor<ExecutorSchema> = async ({ args }, context) => {
    return runComposeExecutor({ args: ["push", ...(args ?? [])] }, context);
};

export default runExecutor;
