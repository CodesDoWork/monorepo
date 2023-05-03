import { Tree } from "@nrwl/devkit";
import { NodeAppGeneratorSchema } from "./schema";
import { generateAppDockerfiles } from "../apps/generator";
import { join } from "path";

export default async function (tree: Tree, options: NodeAppGeneratorSchema) {
    await generateAppDockerfiles(tree, {
        ...options,
        runnerFile: join(__dirname, "files", "Dockerfile__template__"),
    });
}
