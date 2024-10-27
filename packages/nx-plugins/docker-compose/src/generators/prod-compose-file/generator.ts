import { formatFiles, generateFiles, Tree } from "@nx/devkit";
import * as path from "path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { ProdComposeFileGeneratorSchema } from "./schema";

export async function prodComposeFileGenerator(
    tree: Tree,
    options: ProdComposeFileGeneratorSchema,
) {
    if (!tree.exists(options.file)) {
        throw new Error(`File ${options.file} does not exist`);
    }

    const composeFile: DockerComposeFile = parseYaml(tree.read(options.file)?.toString() || "");
    Object.values(composeFile.services).forEach(service => delete service.build);
    const content = stringifyYaml(composeFile);

    generateFiles(tree, path.join(__dirname, "files"), path.parse(options.file).dir, { content });
    await formatFiles(tree);
}

export default prodComposeFileGenerator;

interface DockerComposeFile extends Record<string, unknown> {
    services: Record<string, Service>;
}

interface Service extends Record<string, unknown> {
    build?: unknown;
}
