import { CreateNodes, TargetConfiguration } from "@nx/devkit";
import { existsSync } from "node:fs";
import path from "node:path";
import { CreateNodesContext, CreateNodesResult } from "nx/src/project-graph/plugins/public-api";

export function createNodesForProjects<T = unknown>(
    projectFilePattern: string,
    createNodesFunction: CreateNodesFunction<T>,
): CreateNodes {
    return [
        projectFilePattern,
        (projectConfigurationFile, options, context): ReturnType<CreateNodesFunction<T>> => {
            const root = path.dirname(projectConfigurationFile);

            const isProject =
                existsSync(path.join(root, "project.json")) ||
                existsSync(path.join(root, "package.json"));
            if (!isProject) {
                return {};
            }

            return createNodesFunction({
                projectConfigurationFile,
                options: options as T | undefined,
                context,
                root,
            });
        },
    ];
}

export function getExecutors(
    pluginName: string,
    executorPrefix: string,
    executors: string[],
): Record<string, TargetConfiguration> {
    return Object.fromEntries(
        executors.map(
            executorName =>
                [
                    `${executorPrefix}${executorName}`,
                    { executor: `${pluginName}:${executorName}` },
                ] satisfies [string, TargetConfiguration],
        ),
    );
}

type CreateNodesFunction<T = unknown> = (args: {
    projectConfigurationFile: string;
    options: T | undefined;
    context: CreateNodesContext;
    root: string;
}) => CreateNodesResult | Promise<CreateNodesResult>;
