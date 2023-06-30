import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { convertTemplates, DockerfileKind } from "./convertTemplates";
import { processExtensions } from "./extensions";

export const generateBaseDockerfile = async (
    tree: Tree,
    { base, baseExtensions }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Base,
        {
            image: base,
            ...processExtensions(baseExtensions),
        },
        isInstant,
    );
};
