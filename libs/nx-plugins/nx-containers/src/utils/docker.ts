import { readJsonFile } from "@nrwl/devkit";

export const getImage = (subject: string, organization: string | undefined) => {
    const workspaceName = readJsonFile("package.json").name;
    return `${organization ? organization + "/" : ""}${workspaceName}/${subject}`;
};

export enum Dockerfile {
    Base = "base.Dockerfile",
    Normal = "Dockerfile",
    Dev = "dev.Dockerfile",
}

export enum WorkspaceImage {
    Base = "base",
    Workspace = "workspace",
    Dev = "dev",
}
