import { generateFiles, formatFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { NxContainersGeneratorSchema } from "./schema";
import { addComposeService } from "../../utils/docker-compose";
import { Dockerfile, getImage } from "../../utils/docker";
import generateBase from "../base/generator";
import { Image } from "../../utils/Image";

const image = Image.Workspace;

const sanitizeOptions = async (tree: Tree, options: NxContainersGeneratorSchema) => {
    if (!tree.exists(Dockerfile.Base)) {
        await generateBase(tree, {
            organization: options.organization,
            dockerCompose: options.dockerCompose,
        });
    }
};

const addDockerfile = (tree: Tree, options: NxContainersGeneratorSchema) => {
    generateFiles(tree, join(__dirname, "files"), "", {
        ...options,
        baseImage: getImage(Image.Base, options.organization),
        template: "",
    });
};

export default async function (tree: Tree, options: NxContainersGeneratorSchema) {
    await sanitizeOptions(tree, options);
    addDockerfile(tree, options);

    if (options.dockerCompose) {
        addComposeService(tree, image, {
            build: ".",
            image: getImage(image, options.organization),
        });
    }

    await formatFiles(tree);
}
