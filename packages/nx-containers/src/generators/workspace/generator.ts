import { generateFiles, formatFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { NxContainersGeneratorSchema } from "./schema";
import { getImage } from "../../utils/docker";
import { Image } from "../../utils/Image";

const sanitizeOptions = async (options: NxContainersGeneratorSchema) => {
    if (!options.nodeVersion) {
        options.nodeVersion = "20";
    }
};

const addDockerfiles = (tree: Tree, options: NxContainersGeneratorSchema) => {
    generateFiles(tree, join(__dirname, "files"), "", {
        ...options,
        baseImage: getImage(Image.Base, options.organization),
        template: "",
    });
};

export default async function (tree: Tree, options: NxContainersGeneratorSchema) {
    await sanitizeOptions(options);
    addDockerfiles(tree, options);

    await formatFiles(tree);
}
