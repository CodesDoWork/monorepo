import { Tree } from "@nrwl/devkit";
import { WorkspaceConfig } from "../../config/config.schema";
import { getAppRoot } from "../../utils/tree";
import { getAppConfig } from "../app/getAppConfig";
import { convertTemplates, DockerfileKind } from "./convertTemplates";
import { getImage, WorkspaceImage } from "../../utils/docker";
import { processExtensions } from "./extensions";

export const generateAppDockerfile = async (
    tree: Tree,
    appName: string,
    { organization }: WorkspaceConfig,
    target = getAppRoot(tree, appName),
    isInstant = false,
) => {
    const { extensions, type, options } = getAppConfig(tree, appName);

    convertTemplates(
        tree,
        target,
        DockerfileKind.App,
        {
            workspaceStages: makeWorkspaceStages(organization),
            appName,
            appDir: getAppRoot(tree, appName).replace(tree.root, ""),
            ...options,
            ...processExtensions(extensions),
        },
        isInstant,
        type,
    );
};

const makeWorkspaceStages = (organization?: string) =>
    [
        `FROM ${getImage(WorkspaceImage.Base, organization)} AS base`,
        `FROM ${getImage(WorkspaceImage.Workspace, organization)} AS workspace`,
    ].join("\n");
