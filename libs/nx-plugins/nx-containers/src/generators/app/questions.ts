import { AppConfig } from "../../config/config.schema";
import inquirer from "inquirer";
import { appVariants } from "./variants";

type BaseQuestionsResult = {
    type: AppConfig["type"];
    tags: string;
};

export const askBaseQuestions = (config?: AppConfig): Promise<BaseQuestionsResult> =>
    inquirer.prompt([
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
