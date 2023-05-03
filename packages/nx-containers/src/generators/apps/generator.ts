import {
    formatFiles,
    generateFiles,
    getWorkspaceLayout,
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from "@nrwl/devkit";
import { Dockerfile, getImage, Image } from "../../utils/docker";
import generateWorkspace from "../workspace/generator";
import { join } from "path";
import { addComposeService } from "../../utils/docker-compose";
import { AppGeneratorSchema } from "./schema";
import { mkdirSync, writeFileSync, readFileSync, rmSync } from "fs";

export const generateAppDockerfiles = async (tree: Tree, options: AppGeneratorSchema) => {
    const { appName, organization, dockerCompose } = options;
    await ensureWorkspace(tree, options);
    const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${appName}`;

    addDockerfile(tree, options, projectRoot);

    if (dockerCompose) {
        addComposeService(tree, appName, {
            build: {
                context: ".",
                dockerfile: `${projectRoot}/Dockerfile`,
            },
            container_name: appName,
            image: getImage(appName, organization),
        });
    }

    const projectConfig = readProjectConfiguration(tree, appName);
    projectConfig.targets["build-container"] = {
        executor: "@codesdowork/nx-containers:build",
        options: {
            image: getImage(appName, organization),
            tags: ["latest"],
            organization,
        },
    };
    updateProjectConfiguration(tree, appName, projectConfig);

    await formatFiles(tree);
};

const ensureWorkspace = async (tree: Tree, options: AppGeneratorSchema) => {
    if (!tree.exists(Dockerfile.Normal)) {
        await generateWorkspace(tree, options);
    }
};

const addDockerfile = (
    tree: Tree,
    { runnerFile, ...options }: AppGeneratorSchema,
    projectRoot: string,
) => {
    const templateFilesDir = join(__dirname, "template-files");
    const filesDir = join(__dirname, "files");

    const baseTemplate = readFileSync(join(templateFilesDir, "Dockerfile__template__")).toString();
    const runnerTemplate = readFileSync(runnerFile).toString();
    const dockerfileContent = `${baseTemplate}\n\n${runnerTemplate}`;

    mkdirSync(filesDir);
    writeFileSync(join(filesDir, "Dockerfile__template__"), dockerfileContent);

    generateFiles(tree, filesDir, projectRoot, {
        ...options,
        baseImage: getImage(Image.Base, options.organization),
        workspaceImage: getImage(Image.Workspace, options.organization),
        template: "",
    });

    rmSync(filesDir, { recursive: true, force: true });
};
