import { AppConfig } from "../../config/config.schema";
import inquirer from "inquirer";
import { appVariants } from "./variants";
import { defaultComposeFile } from "../../utils/docker-compose";

type BaseQuestionsResult = {
    type: AppConfig["type"];
    tags: string;
    composeFile: AppConfig["composeFile"];
    composeServiceName: AppConfig["composeServiceName"];
};

export const askBaseQuestions = (oldConfig?: AppConfig): Promise<BaseQuestionsResult> =>
    inquirer.prompt([
        {
            name: "type",
            message: "What type of app do you want to create?",
            default: oldConfig?.type,
            type: "list",
            choices: Object.keys(appVariants),
        },
        {
            name: "tags",
            default: (oldConfig?.tags ?? ["latest"]).join(","),
            message: "What tags do you want to use? (comma separated)",
            type: "input",
        },
        {
            name: "dockerCompose",
            message: "Do you want to use Docker Compose?",
            type: "confirm",
        },
        {
            name: "composeFile",
            message: "Which compose file do you want to use?",
            type: "input",
            default: oldConfig?.composeFile ?? defaultComposeFile,
            when: answers => !!answers.dockerCompose,
        },
        {
            name: "composeServiceName",
            message: "Which service name does your app have?",
            type: "input",
            default: oldConfig?.composeServiceName,
            when: answers => !!answers.dockerCompose,
        },
    ]);

type ExtensionQuestionResult = {
    extensions?: string[];
};

export const askForExtensions = (
    extensions: string[],
    config?: AppConfig,
): Promise<ExtensionQuestionResult> =>
    inquirer.prompt([
        {
            name: "extensions",
            default: config?.extensions ?? [],
            type: "checkbox",
            message: "What extensions do you want to use?",
            choices: extensions,
            when: !!extensions.length,
        },
    ]);
