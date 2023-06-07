import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { convertTemplates } from "./convertTemplates";
import { DockerfileKind, processExtensions } from "../extensions";

export const generateBaseDockerfile = async (
    tree: Tree,
    { base, baseExtensions, os }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Base,
        {
            image: base,
            ...(await processExtensions(baseExtensions, DockerfileKind.Base, os)),
        },
        isInstant,
    );
};
