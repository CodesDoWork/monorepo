import inquirer from "inquirer";
import { OSVariant, WorkspaceConfig } from "../../config/config.schema";
import { defaultComposeFile } from "../../utils/docker-compose";
import { DockerfileKind, getExtensions } from "../extensions";

type BaseQuestionsResult = {
    base: WorkspaceConfig["base"];
    os: WorkspaceConfig["os"];
    organization: WorkspaceConfig["organization"];
    composeFile: WorkspaceConfig["composeFile"];
};

export const askBaseQuestions = (oldConfig: WorkspaceConfig | null): Promise<BaseQuestionsResult> =>
    inquirer.prompt([
        {
            name: "base",
            default: oldConfig?.base ?? "node:20-alpine",
            type: "string",
            message: "Which version of node do you want to use (image or Dockerfile)?",
        },
        {
            name: "os",
            message: "Which variant is it?",
            default: oldConfig?.os,
            type: "list",
            choices: Object.values(OSVariant),
        },
        {
            name: "organization",
            default: oldConfig?.organization,
            type: "string",
            message: "Organization (can be blank)",
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
    ]);

type ExtensionQuestionsResult = {
    baseExtensions: WorkspaceConfig["baseExtensions"];
    workspaceExtensions: WorkspaceConfig["workspaceExtensions"];
    devExtensions: WorkspaceConfig["devExtensions"];
};

export const askForExtensions = (
    oldConfig: WorkspaceConfig | null,
    os: OSVariant,
): Promise<ExtensionQuestionsResult> =>
    inquirer.prompt([
        {
            name: "baseExtensions",
            default: oldConfig?.baseExtensions ?? [],
            type: "checkbox",
            message: "What base extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Base, os).map(extension => extension.name),
        },
        {
            name: "workspaceExtensions",
            default: oldConfig?.workspaceExtensions ?? [],
            type: "checkbox",
            message: "What workspace extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Workspace, os).map(extension => extension.name),
        },
        {
            name: "devExtensions",
            default: oldConfig?.devExtensions ?? [],
            type: "checkbox",
            message: "What dev extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Dev, os).map(extension => extension.name),
        },
    ]);
