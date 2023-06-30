import {
    formatFiles,
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from "@nrwl/devkit";
import { join } from "path";
import { AppGeneratorSchema } from "./schema";
import { configFile, loadAppConfig } from "../../config/config";
import inquirer from "inquirer";
import { appVariants } from "./variants";
import { AppConfig } from "../../config/config.schema";
import { getAppRoot } from "../../utils/tree";
import { stringifyCleanObject } from "../../utils/object";
import { askBaseQuestions } from "./questions";
import { defaultComposeFile } from "../../utils/docker-compose";

export default async function (tree: Tree, options: AppGeneratorSchema) {
    const { appName } = options;

    const appRoot = getAppRoot(tree, appName);
    const appConfig = await collectAppConfig(loadAppConfig(appRoot));
    if (appConfig.composeFile === defaultComposeFile) {
        delete appConfig.composeFile;
    }

    tree.write(join(appRoot, configFile), stringifyCleanObject(appConfig));
    addExecutorToProjectConfig(tree, appName);
    await formatFiles(tree);
}

const collectAppConfig = async (oldConfig: AppConfig | null): Promise<AppConfig> => {
    const { type, tags, ...baseConfig } = await askBaseQuestions();
    const appOptions = await inquirer.prompt(appVariants[type].questions(oldConfig?.options ?? {}));

    return {
        type,
        tags: tags.replace(/\s/g, "").split(","),
        options: appOptions,
        ...baseConfig,
    };
};

const addExecutorToProjectConfig = (tree: Tree, appName: string) => {
    const projectConfig = readProjectConfiguration(tree, appName);
    if (!projectConfig.targets) {
        projectConfig.targets = {};
    }

    projectConfig.targets["build-image"] = { executor: "@codesdowork/nx-containers:build" };
    updateProjectConfiguration(tree, appName, projectConfig);
};
