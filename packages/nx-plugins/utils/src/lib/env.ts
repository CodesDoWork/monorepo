import { ExecutorContext } from "@nx/devkit";
import path from "node:path";
import { loadAndExpandDotEnvFile } from "nx/src/tasks-runner/task-env";
import { projectRoot } from "./nx-project";

export type Env = NodeJS.ProcessEnv & Record<string, string>;

export function loadEnv(dir = "."): Env {
    const loadedEnv: Env = { ...process.env, NODE_ENV: process.env.NODE_ENV || "development" };
    loadAndExpandDotEnvFile(path.join(dir, ".env"), loadedEnv, true);

    return loadedEnv;
}

interface ReplaceEnvResult {
    expandedArgs: string[];
    usedEnvs: string[];
}

export function replaceEnvs(args: string[], context: ExecutorContext): ReplaceEnvResult {
    const env = loadEnv(projectRoot(context));
    const usedEnvs: string[] = [];
    const expandedArgs = args.map(arg =>
        arg.replace(
            /\$(\w+)|\${(\w+)}/g,
            (original: string, style1: string | undefined, style2: string | undefined) => {
                const key = style1 || style2 || "";
                return key in env
                    ? ((usedEnvs.push(env[key] as string) && env[key]) as string)
                    : original;
            },
        ),
    );

    return { expandedArgs, usedEnvs };
}
