import {
    formatFiles,
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from "@nrwl/devkit";
import { getImage, WorkspaceImage } from "../../utils/docker";
import { join } from "path";
import { addComposeService, composeFile } from "../../utils/docker-compose";
import { AppGeneratorSchema } from "./schema";
import { configFile, loadAppConfig } from "../../config/config";
import inquirer, { Question } from "inquirer";
import { appVariants } from "./variants";
import { AppConfig } from "../../config/config.schema";
import { DockerfileKind, getExtensions } from "../extensions";
import { getAppRoot } from "../../utils/tree";
import { getWorkspaceConfig } from "../workspace/getWorkspaceConfig";
import { cleanObject } from "../../utils/object";

export default async function (tree: Tree, options: AppGeneratorSchema) {
    const { appName } = options;

    const workspaceConfig = getWorkspaceConfig(tree);
    const appRoot = getAppRoot(tree, appName);
    const config = loadAppConfig(appRoot);
    const { type, tags, engine } = await inquirer.prompt([
        {
            name: "type",
            message: "What type of app do you want to create?",
            default: config?.type,
            type: "list",
            choices: Object.keys(appVariants),
        },
        {
            name: "tags",
            default: (config?.tags ?? ["latest"]).join(","),
            message: "What tags do you want to use? (comma separated)",
            type: "input",
        },
        {
            name: "engine",
            message: "Which engine do you want to use?",
            default: config?.engine,
            type: "list",
            choices: ["docker", "dockerCompose"],
        },
    ]);

    const composeFileOption = "dockerComposeFile";
    const engineQuestions: Record<AppConfig["engine"], Question[]> = {
        docker: [
            {
                name: "base",
                message: "What is the base image for the docker container?",
                default:
                    config?.options?.base ??
                    getImage(WorkspaceImage.Base, workspaceConfig.organization),
                type: "input",
            },
        ],
        dockerCompose: [
            {
                name: composeFileOption,
                message: "What is the docker compose file?",
                default: config?.options?.composeFile ?? composeFile,
                type: "input",
            },
        ],
    };

    const appOptions = await inquirer.prompt([
        ...engineQuestions[engine],
        ...appVariants[type].questions(config?.options ?? {}),
    ]);
    if (appOptions[composeFileOption] === composeFile) {
        delete appOptions[composeFileOption];
    }

    const { extensions } = await inquirer.prompt([
        {
            name: "extensions",
            default: config?.extensions ?? [],
            type: "checkbox",
            message: "What extensions do you want to use?",
            choices: getExtensions(DockerfileKind.App, workspaceConfig.variant).map(
                extension => extension.name,
            ),
        },
    ]);

    const appConfig: AppConfig = {
        type,
        tags: tags.replace(/\s/g, "").split(","),
        engine,
        options: appOptions,
        extensions,
    };

    tree.write(join(appRoot, configFile), JSON.stringify(cleanObject(appConfig), undefined, 2));

    if (engine === "dockerCompose") {
        addComposeService(tree, appName, {
            container_name: appName,
            image: getImage(appName, workspaceConfig.organization),
        });
    }

    const projectConfig = readProjectConfiguration(tree, appName);
    projectConfig.targets["build-image"] = { executor: "@codesdowork/nx-containers:build" };
    updateProjectConfiguration(tree, appName, projectConfig);

    await formatFiles(tree);
}
