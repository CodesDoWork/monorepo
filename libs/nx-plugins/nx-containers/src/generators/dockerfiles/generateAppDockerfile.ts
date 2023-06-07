import { Tree } from "@nrwl/devkit";
import { AppConfig, WorkspaceConfig } from "../../config/config.schema";
import { getAppRoot } from "../../utils/tree";
import { getAppConfig } from "../app/getAppConfig";
import { DockerfileKind, processExtensions } from "../extensions";
import { convertTemplates } from "./convertTemplates";
import { getImage, WorkspaceImage } from "../../utils/docker";

export const generateAppDockerfile = async (
    tree: Tree,
    appName: string,
    { organization, os }: WorkspaceConfig,
    target = getAppRoot(tree, appName),
    isInstant = false,
) => {
    const { extensions, type, options } = getAppConfig(tree, appName);
    const { copy = [], ...appOptions } = options;

    convertTemplates(
        tree,
        target,
        DockerfileKind.App,
        {
            workspaceStages: makeWorkspaceStages(organization),
            appName,
            copy: makeCopyCommands(copy),
            ...appOptions,
            ...(await processExtensions(extensions, DockerfileKind.App, os, type)),
        },
        isInstant,
        type,
    );
};

const makeWorkspaceStages = (organization: string) =>
    [
        `FROM ${getImage(WorkspaceImage.Base, organization)} AS base`,
        `FROM ${getImage(WorkspaceImage.Workspace, organization)} AS workspace`,
    ].join("\n");

const makeCopyCommands = (copy: AppConfig["options"]["copy"]) =>
    copy.map(entry => `COPY ${entry.from} ${entry.to}`).join("\n") + (copy.length ? "\n" : "");
