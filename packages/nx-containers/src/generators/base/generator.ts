import { generateFiles, formatFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { NxContainersGeneratorSchema } from "./schema";
import { addComposeService } from "../../utils/docker-compose";
import { Dockerfile, getImage } from "../../utils/docker";
import { Image } from "../../utils/Image";

const image = Image.Base;

const sanitizeOptions = (options: NxContainersGeneratorSchema) => {
    if (!options.nodeVersion) {
        options.nodeVersion = "20";
    }
};

const addDockerfile = (tree: Tree, options: NxContainersGeneratorSchema) => {
    generateFiles(tree, join(__dirname, "files"), "", { ...options, template: "" });
};

export default async function (tree: Tree, options: NxContainersGeneratorSchema) {
    sanitizeOptions(options);
    addDockerfile(tree, options);

    if (options.dockerCompose) {
        addComposeService(tree, image, {
            build: {
                context: ".",
                dockerfile: Dockerfile.Base,
            },
            image: getImage(image, options.organization),
        });
    }

    await formatFiles(tree);
}
