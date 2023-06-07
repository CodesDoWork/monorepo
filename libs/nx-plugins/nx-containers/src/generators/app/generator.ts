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
import { AppConfig, OSVariant } from "../../config/config.schema";
import { DockerfileKind, getExtensions } from "../extensions";
import { getAppRoot } from "../../utils/tree";
import { getWorkspaceConfig } from "../workspace/getWorkspaceConfig";
import { stringifyCleanObject } from "../../utils/object";
import { askBaseQuestions, askForExtensions } from "./questions";

export default async function (tree: Tree, options: AppGeneratorSchema) {
    const { appName } = options;

    const { os } = getWorkspaceConfig(tree);
    const appRoot = getAppRoot(tree, appName);
    const appConfig = await collectAppConfig(os, loadAppConfig(appRoot));

    tree.write(join(appRoot, configFile), stringifyCleanObject(appConfig));
    addExecutorToProjectConfig(tree, appName);
    await formatFiles(tree);
}

const collectAppConfig = async (os: OSVariant, oldConfig: AppConfig | null): Promise<AppConfig> => {
    const { type, tags } = await askBaseQuestions();

    const appOptions = await inquirer.prompt(appVariants[type].questions(oldConfig?.options ?? {}));

    const possibleExtensions = getExtensions(DockerfileKind.App, os, type);
    const possibleExtensionNames = possibleExtensions.map(extension => extension.name);
    const { extensions } = await askForExtensions(possibleExtensionNames, oldConfig);

    return {
        type,
        tags: tags.replace(/\s/g, "").split(","),
        options: appOptions,
        extensions,
    };
};

const addExecutorToProjectConfig = (tree: Tree, appName: string) => {
    const projectConfig = readProjectConfiguration(tree, appName);
    projectConfig.targets["build-image"] = { executor: "@codesdowork/nx-containers:build" };
    updateProjectConfiguration(tree, appName, projectConfig);
};
