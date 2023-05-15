import { formatFiles, generateFiles, Tree } from "@nrwl/devkit";
import { getImage, WorkspaceImage } from "../../utils/docker";
import { DockerfileArea, DockerfileKind, processExtensions } from "../extensions";
import inquirer from "inquirer";
import { DockerfilesGeneratorSchema } from "./schema";
import { getAppRoot } from "../../utils/tree";
import { generateFilesInstant, joinTruthy } from "../../utils/files";
import { getWorkspaceConfig } from "../workspace/getWorkspaceConfig";
import { AppConfig, ImageVariant, WorkspaceConfig } from "../../config/config.schema";
import { getAppConfig } from "../app/getAppConfig";

export const makeCopy = (copy: AppConfig["options"]["copy"]) =>
    copy.map(entry => `COPY ${entry.from} ${entry.to}`).join("\n") + (copy.length ? "\n" : "");

export const makeArgsAndEnvs = () => ["ARG VERSION", "ENV PACKAGE_VERSION $VERSION"].join("\n");

export const makeWorkspaceStages = (organization: string) =>
    [
        `FROM ${getImage(WorkspaceImage.Base, organization)} AS base`,
        `FROM ${getImage(WorkspaceImage.Workspace, organization)} AS workspace`,
    ].join("\n");

const convertTemplates = (
    tree: Tree,
    target: string,
    kind: DockerfileKind,
    options: Record<string, unknown>,
    isInstant = false,
    appVariant?: string,
) => {
    Object.values(DockerfileArea).forEach(area => {
        if (area in options) {
            options[area] = `\n${options[area]}\n`;
        } else {
            options[area] = "";
        }
    });

    const generate = isInstant ? generateFilesInstant : generateFiles;
    generate(tree, joinTruthy(__dirname, "files", kind, appVariant), target, {
        template: "",
        argsAndEnvs: makeArgsAndEnvs(),
        ...options,
    });
};

export const generateBaseDockerfile = async (
    tree: Tree,
    { base, baseExtensions, variant }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Base,
        {
            image: base,
            ...(await processExtensions(baseExtensions, DockerfileKind.Base, variant)),
        },
        isInstant,
    );
};

export const generateWorkspaceDockerfile = async (
    tree: Tree,
    { workspaceExtensions, organization, variant }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    const installGit =
        variant === ImageVariant.Alpine
            ? ["RUN apk add git"]
            : ["RUN apt-get update", "RUN apt-get install -y git"];
    convertTemplates(
        tree,
        target,
        DockerfileKind.Workspace,
        {
            baseImage: getImage(WorkspaceImage.Base, organization),
            installGit: installGit.join("\n"),
            ...(await processExtensions(workspaceExtensions, DockerfileKind.Workspace, variant)),
        },
        isInstant,
    );
};

export const generateDevDockerfile = async (
    tree: Tree,
    { devExtensions, organization, variant }: WorkspaceConfig,
    target = "",
    isInstant = false,
) => {
    convertTemplates(
        tree,
        target,
        DockerfileKind.Dev,
        {
            baseImage: getImage(WorkspaceImage.Base, organization),
            ...(await processExtensions(devExtensions, DockerfileKind.Dev, variant)),
        },
        isInstant,
    );
};

export const generateAppDockerfile = async (
    tree: Tree,
    appName: string,
    { organization, variant }: WorkspaceConfig,
    target = getAppRoot(tree, appName),
    isInstant = false,
) => {
    const appConfig = getAppConfig(tree, appName);
    const { copy = [], ...appOptions } = appConfig.options;

    convertTemplates(
        tree,
        target,
        DockerfileKind.App,
        {
            workspaceStages: makeWorkspaceStages(organization),
            appName,
            copy: makeCopy(copy),
            ...appOptions,
            ...(await processExtensions(appConfig.extensions, DockerfileKind.App, variant)),
        },
        isInstant,
        appConfig.type,
    );
};

export default async function (tree: Tree, options: DockerfilesGeneratorSchema) {
    const workspaceConfig = getWorkspaceConfig(tree);
    const { appName } = options;
    if (appName) {
        await generateAppDockerfile(tree, appName, workspaceConfig);
    } else {
        const { dockerfiles } = await inquirer.prompt([
            {
                name: "dockerfiles",
                type: "checkbox",
                message: "Which Dockerfiles do you want to create?",
                choices: Object.values(WorkspaceImage),
            },
        ]);

        dockerfiles.includes(WorkspaceImage.Base) &&
            (await generateBaseDockerfile(tree, workspaceConfig));
        dockerfiles.includes(WorkspaceImage.Workspace) &&
            (await generateWorkspaceDockerfile(tree, workspaceConfig));
        dockerfiles.includes(WorkspaceImage.Dev) &&
            (await generateDevDockerfile(tree, workspaceConfig));
    }

    await formatFiles(tree);
}
