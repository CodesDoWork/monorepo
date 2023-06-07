import { formatFiles, Tree } from "@nrwl/devkit";
import { WorkspaceImage } from "../../utils/docker";
import { DockerfilesGeneratorSchema } from "./schema";
import { getWorkspaceConfig } from "../workspace/getWorkspaceConfig";
import { WorkspaceConfig } from "../../config/config.schema";
import { askWhichDockerfilesToCreate } from "./questions";
import { generateAppDockerfile } from "./generateAppDockerfile";
import { generateBaseDockerfile } from "./generateBaseDockerfile";
import { generateWorkspaceDockerfile } from "./generateWorkspaceDockerfile";
import { generateDevDockerfile } from "./generateDevDockerfile";

export default async function (tree: Tree, options: DockerfilesGeneratorSchema) {
    const workspaceConfig = getWorkspaceConfig(tree);
    const { appName } = options;
    if (appName) {
        await generateAppDockerfile(tree, appName, workspaceConfig);
    } else {
        const { dockerfiles } = await askWhichDockerfilesToCreate();
        for (const dockerfile of dockerfiles) {
            await generationFunction[dockerfile](tree, workspaceConfig);
        }
    }

    await formatFiles(tree);
}

const generationFunction: Record<
    WorkspaceImage,
    (tree: Tree, workspaceConfig: WorkspaceConfig) => Promise<void>
> = {
    [WorkspaceImage.Base]: generateBaseDockerfile,
    [WorkspaceImage.Workspace]: generateWorkspaceDockerfile,
    [WorkspaceImage.Dev]: generateDevDockerfile,
};
