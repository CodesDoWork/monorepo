import type { CreateNodesV2, TargetConfiguration } from "@nx/devkit";
import type {
    CreateNodesContextV2,
    CreateNodesResult,
    CreateNodesResultV2,
} from "nx/src/project-graph/plugins/public-api";
import { existsSync } from "node:fs";
import path from "node:path";

export function createNodesForProjects<T = unknown>(
    projectFilePattern: string,
    createNodesFunction: CreateNodesFunction<T>,
    detectProject = true,
): CreateNodesV2 {
    return [
        projectFilePattern,
        async (projectConfigurationFiles, options, context) => {
            const createNodeResultFunction = createNodesResult(
                createNodesFunction,
                detectProject,
                options as T | undefined,
                context,
            );

            const results: CreateNodesResultV2 = [];
            for (const projectConfigurationFile of projectConfigurationFiles) {
                const result = await createNodeResultFunction(projectConfigurationFile);
                results.push([projectConfigurationFile, result]);
            }

            return results;
        },
    ];
}

function createNodesResult<T>(
    createNodesFunction: CreateNodesFunction<T>,
    detectProject: boolean,
    options: T | undefined,
    context: CreateNodesContextV2,
) {
    return function (projectConfigurationFile: string): ReturnType<CreateNodesFunction<T>> {
        const root = path.dirname(projectConfigurationFile);

        const isProject =
            existsSync(path.join(root, "project.json")) ||
            existsSync(path.join(root, "package.json"));
        if (!isProject && detectProject) {
            return {};
        }

        return createNodesFunction({
            projectConfigurationFile,
            options,
            context,
            root,
        });
    };
}

export function getExecutors<T = unknown>(
    pluginName: string,
    executorPrefix: string,
    executors: string[],
    options?: T,
): Record<string, TargetConfiguration> {
    return Object.fromEntries(
        executors.map(
            executorName =>
                [
                    `${executorPrefix}${executorName}`,
                    { executor: `${pluginName}:${executorName}`, options },
                ] satisfies [string, TargetConfiguration],
        ),
    );
}

type CreateNodesFunction<T = unknown> = (args: {
    projectConfigurationFile: string;
    options: T | undefined;
    context: CreateNodesContextV2;
    root: string;
}) => CreateNodesResult | Promise<CreateNodesResult>;
