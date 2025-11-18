import { join, relative } from "node:path";
import tsconfig from "@cdw/monorepo/tsconfig.json";

export function getJitiAliasContent(root: string, relativeProjectDir?: string): string {
    const projectPathsPrefix = relativeProjectDir ? relative(relativeProjectDir, root) : root;

    const tsConfigPaths = tsconfig.compilerOptions.paths;
    const jitiAliasObject = Object.entries(tsConfigPaths).reduce(
        (jao, [alias, paths]) => ({ ...jao, [alias]: join(projectPathsPrefix, paths[0] || "") }),
        {} as Record<string, string>,
    );

    return JSON.stringify(jitiAliasObject);
}
