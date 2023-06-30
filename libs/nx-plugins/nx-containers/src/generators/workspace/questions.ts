import inquirer from "inquirer";
import { WorkspaceConfig } from "../../config/config.schema";

type BaseQuestionsResult = {
    base: WorkspaceConfig["base"];
    organization: WorkspaceConfig["organization"];
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
            name: "organization",
            default: oldConfig?.organization,
            type: "string",
            message: "Organization (can be blank)",
        },
    ]);
