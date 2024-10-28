import path from "node:path";
import { loadAndExpandDotEnvFile } from "nx/src/tasks-runner/task-env";

export type Env = NodeJS.ProcessEnv & Record<string, string>;

export function loadEnv(dir = "."): Env {
    const loadedEnv: Env = { NODE_ENV: "development" };
    loadAndExpandDotEnvFile(path.join(dir, ".env"), loadedEnv);

    return loadedEnv;
}
