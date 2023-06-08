import inquirer from "inquirer";
import { WorkspaceImage } from "../../utils/docker";

type DockerfilesQuestionResult = {
    dockerfiles: WorkspaceImage[];
};

export const askWhichDockerfilesToCreate = (): Promise<DockerfilesQuestionResult> =>
    inquirer.prompt([
        {
            name: "dockerfiles",
            type: "checkbox",
            message: "Which Dockerfiles do you want to create?",
            choices: Object.values(WorkspaceImage),
        },
    ]);
