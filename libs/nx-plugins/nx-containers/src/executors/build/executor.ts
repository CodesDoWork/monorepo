import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { getAppVersions } from "./getAppVersions";
import { Dockerfile, getImage, WorkspaceImage } from "../../utils/docker";
import { hasComposeServiceWithBuild } from "../../utils/docker-compose";
import { logError, logStep } from "../../utils/logging";
import { existsSync } from "fs";
import { getWorkspaceConfig } from "../../generators/workspace/getWorkspaceConfig";
import { join } from "path";
import { getAppConfig } from "../../generators/app/getAppConfig";
import { FsTree } from "nx/src/generators/tree";
import { executeCmd } from "./process";
import { buildDockerCommand, buildDockerComposeCommand } from "./buildCommands";
import { generateBaseDockerfile } from "../../generators/dockerfiles/generateBaseDockerfile";
import { generateWorkspaceDockerfile } from "../../generators/dockerfiles/generateWorkspaceDockerfile";
import { generateAppDockerfile } from "../../generators/dockerfiles/generateAppDockerfile";

export default async function buildImage(_options: unknown, context: ExecutorContext) {
    const { workspace, projectName, root, configurationName } = context;
    const tree = new FsTree(root, false);
    const workspaceConfig = getWorkspaceConfig(tree);
    const { organization, composeFile, registry } = workspaceConfig;
    const tempFilesDir = join(__dirname.replace(root, ""), "tmp");

    const buildBaseImage = async (): Promise<void> => {
        let dockerfile = join(root, Dockerfile.Base);
        if (!existsSync(dockerfile)) {
            dockerfile = join(tempFilesDir, Dockerfile.Base);
            await generateBaseDockerfile(tree, workspaceConfig, tempFilesDir, true);
        }

        logStep("Building base image");
        return executeCmd(
            buildDockerCommand(getImage(WorkspaceImage.Base, organization), { dockerfile }),
        );
    };

    const buildWorkspaceImage = async (): Promise<void> => {
        let dockerfile = join(root, Dockerfile.Normal);
        if (!existsSync(dockerfile)) {
            dockerfile = join(tempFilesDir, Dockerfile.Normal);
            await generateWorkspaceDockerfile(tree, workspaceConfig, tempFilesDir, true);
        }

        logStep("Building workspace image");
        return executeCmd(
            buildDockerCommand(getImage(WorkspaceImage.Workspace, organization), { dockerfile }),
        );
    };

    const appRoot = workspace.projects[projectName].root;
    const { version, major, minor, patch } = getAppVersions(appRoot, root);
    const tags = getAppConfig(tree, projectName).tags.map(tag =>
        tag
            .replace("{version}", version)
            .replace("{major}", major)
            .replace("{minor}", minor)
            .replace("{patch}", patch),
    );

    const tmpAppPath = join(tempFilesDir, "apps", projectName);
    const appBuildArgs = { VERSION: version };
    let image = getImage(projectName, organization);
    const isPublishMode = configurationName === "production" && registry;
    if (isPublishMode) {
        image = join(registry, image);
    }

    const buildAppImage = (): Promise<void> => {
        logStep(`Building image for ${projectName}`);
        const projectHasComposeBuild = hasComposeServiceWithBuild(projectName, composeFile);
        return projectHasComposeBuild ? buildAndTagAppImageCompose() : buildAppImageDocker();
    };

    const buildAppImageDocker = async () => {
        let dockerfile = join(appRoot, Dockerfile.Normal);
        if (!existsSync(dockerfile)) {
            dockerfile = join(tmpAppPath, Dockerfile.Normal);
            await generateAppDockerfile(tree, projectName, workspaceConfig, tmpAppPath, true);
        }

        await executeCmd(
            buildDockerCommand(image, {
                args: appBuildArgs,
                tags,
                dockerfile,
            }),
        );
    };

    const buildAndTagAppImageCompose = async () => {
        await executeCmd(
            buildDockerComposeCommand(projectName, {
                args: appBuildArgs,
                configFile: composeFile,
            }),
        );

        for (const tag of tags) {
            await executeCmd(`docker tag ${image} ${image}:${tag}`);
        }
    };

    const publishAppImage = () => executeCmd(`docker push ${image}`);

    const pruneDanglingImages = () => executeCmd("docker image prune -f").catch(logError);

    return buildBaseImage()
        .then(buildWorkspaceImage)
        .then(buildAppImage)
        .then(() => isPublishMode && publishAppImage())
        .then(() => ({ success: true }))
        .catch(err => {
            logError(err);
            return { success: false };
        })
        .finally(pruneDanglingImages);
}
