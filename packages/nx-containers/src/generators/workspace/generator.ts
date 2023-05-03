import { generateFiles, formatFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import { WorkspaceGeneratorSchema } from "./schema";
import { Image, getImage } from "../../utils/docker";

const sanitizeOptions = async (options: WorkspaceGeneratorSchema) => {
    if (!options.nodeVersion) {
        options.nodeVersion = "20";
    }
};

const addDockerfiles = (tree: Tree, options: WorkspaceGeneratorSchema) => {
    generateFiles(tree, join(__dirname, "files"), "", {
        ...options,
        baseImage: getImage(Image.Base, options.organization),
        template: "",
    });
};

export default async function (tree: Tree, options: WorkspaceGeneratorSchema) {
    await sanitizeOptions(options);
    addDockerfiles(tree, options);

    await formatFiles(tree);
}
