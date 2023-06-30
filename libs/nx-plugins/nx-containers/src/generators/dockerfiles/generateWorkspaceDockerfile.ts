import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { convertTemplates, DockerfileKind } from "./convertTemplates";
import { getImage, WorkspaceImage } from "../../utils/docker";
import { processExtensions } from "./extensions";

export const generateWorkspaceDockerfile = async (
    tree: Tree,
    { workspaceExtensions, organization }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Workspace,
        {
            baseImage: getImage(WorkspaceImage.Base, organization),
            ...processExtensions(workspaceExtensions),
        },
        isInstant,
    );
};
