import type { ExecutorContext } from "@nx/devkit";
import path from "node:path";
import { loadAndExpandDotEnvFile } from "nx/src/tasks-runner/task-env";
import { projectRoot } from "./nx-project";

export type Env = NodeJS.ProcessEnv & Record<string, string>;

export function loadEnv(dir = "."): Env {
    const loadedEnv: Env = { ...process.env, NODE_ENV: process.env.NODE_ENV || "development" };
    loadAndExpandDotEnvFile(path.join(dir, ".env"), loadedEnv, true);

    return loadedEnv;
}

interface ReplaceEnvResult<T> {
    expanded: T;
    usedEnvs: string[];
}

export function replaceEnvsInString(
    arg: string,
    context: ExecutorContext,
): ReplaceEnvResult<string> {
    return replaceEnvsInType(context, replaceEnvs => replaceEnvs(arg));
}

export function replaceEnvsInArray(
    args: string[],
    context: ExecutorContext,
): ReplaceEnvResult<string[]> {
    return replaceEnvsInType(context, replaceEnvs => args.map(replaceEnvs));
}

export function replaceEnvsInObject(
    args: Record<string, string>,
    context: ExecutorContext,
): ReplaceEnvResult<Record<string, string>> {
    return replaceEnvsInType(
        context,
        replaceEnvs =>
            Object.entries(args).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: replaceEnvs(value) }),
                {},
            ) as Record<string, string>,
    );
}

function replaceEnvsInType<T>(
    context: ExecutorContext,
    callback: (replaceEnvs: (s: string) => string) => T,
): ReplaceEnvResult<T> {
    const env = loadEnv(projectRoot(context));
    const usedEnvs: string[] = [];
    const replaceEnvs = getReplaceEnvsFunction(env, usedEnvs);
    const expanded = callback(replaceEnvs);

    return { expanded, usedEnvs };
}

function getReplaceEnvsFunction(env: Record<string, string>, usedEnvs: string[]) {
    return function (s: string): string {
        return s.replace(
            /\$(\w+)|\$\{(\w+)\}/g,
            (original: string, style1: string | undefined, style2: string | undefined) => {
                const key = style1 || style2 || "";
                return key in env
                    ? ((usedEnvs.push(env[key] as string) && env[key]) as string)
                    : original;
            },
        );
    };
}
