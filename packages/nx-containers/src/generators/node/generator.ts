import {
    generateFiles,
    formatFiles,
    Tree,
    getWorkspaceLayout,
    readProjectConfiguration,
    updateProjectConfiguration,
} from "@nrwl/devkit";
import { join } from "path";
import { NxContainersGeneratorSchema } from "./schema";
import { addComposeService } from "../../utils/docker-compose";
import { Dockerfile, getImage } from "../../utils/docker";
import generateWorkspace from "../workspace/generator";
import { Image } from "../../utils/Image";

const ensureWorkspace = async (tree: Tree, options: NxContainersGeneratorSchema) => {
    if (!tree.exists(Dockerfile.Normal)) {
        await generateWorkspace(tree, options);
    }
};

const addDockerfile = (tree: Tree, options: NxContainersGeneratorSchema, projectRoot: string) => {
    generateFiles(tree, join(__dirname, "files"), projectRoot, {
        ...options,
        baseImage: getImage(Image.Base, options.organization),
        workspaceImage: getImage(Image.Workspace, options.organization),
        template: "",
    });
};

export default async function (tree: Tree, options: NxContainersGeneratorSchema) {
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
            dockerCompose,
        },
    };
    updateProjectConfiguration(tree, appName, projectConfig);

    await formatFiles(tree);
}
