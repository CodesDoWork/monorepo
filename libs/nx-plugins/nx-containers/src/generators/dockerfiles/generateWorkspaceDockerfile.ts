import { Tree } from "@nrwl/devkit";
import { OSVariant, WorkspaceConfig } from "../../config/config.schema";
import { convertTemplates } from "./convertTemplates";
import { DockerfileKind, processExtensions } from "../extensions";
import { getImage, WorkspaceImage } from "../../utils/docker";

export const generateWorkspaceDockerfile = async (
    tree: Tree,
    { workspaceExtensions, organization, os }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Workspace,
        {
            baseImage: getImage(WorkspaceImage.Base, organization),
            installGit: getInstallGitDockerfileCommands(os).join("\n"),
            ...(await processExtensions(workspaceExtensions, DockerfileKind.Workspace, os)),
        },
        isInstant,
    );
};

const getInstallGitDockerfileCommands = (os: OSVariant): string[] => {
    return os === OSVariant.Alpine
        ? ["RUN apk add git"]
        : ["RUN apt-get update", "RUN apt-get install -y git"];
};
