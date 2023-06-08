import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { convertTemplates } from "./convertTemplates";
import { DockerfileKind, processExtensions } from "../extensions";
import { getImage, WorkspaceImage } from "../../utils/docker";

export const generateDevDockerfile = async (
    tree: Tree,
    { devExtensions, organization, os }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Dev,
        {
            baseImage: getImage(WorkspaceImage.Base, organization),
            ...(await processExtensions(devExtensions, DockerfileKind.Dev, os)),
        },
        isInstant,
    );
};
