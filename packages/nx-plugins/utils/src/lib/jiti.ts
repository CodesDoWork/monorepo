import type { ExecutorContext } from "@nx/devkit";
import { join, relative } from "node:path";
import tsconfig from "@cdw/monorepo/tsconfig.json";

export function getJitiAliasContent(projectDir: string, context: ExecutorContext): string {
    const projectPathsPrefix = relative(projectDir, context.root);
    const tsConfigPaths = tsconfig.compilerOptions.paths;
    const jitiAliasObject = Object.entries(tsConfigPaths).reduce(
        (jao, [alias, paths]) => ({ ...jao, [alias]: join(projectPathsPrefix, paths[0] || "") }),
        {} as Record<string, string>,
    );

    return JSON.stringify(jitiAliasObject);
}
