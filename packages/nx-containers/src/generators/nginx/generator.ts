import { Tree } from "@nrwl/devkit";
import { NginxAppGeneratorSchema } from "./schema";
import { generateAppDockerfiles } from "../apps/generator";
import { join } from "path";

const sanitizeOptions = (options: NginxAppGeneratorSchema) => {
    if (!options.nginxVersion) {
        options.nginxVersion = "1";
    }
};

export default async function (tree: Tree, options: NginxAppGeneratorSchema) {
    sanitizeOptions(options);
    await generateAppDockerfiles(tree, {
        ...options,
        runnerFile: join(__dirname, "files", "Dockerfile__template__"),
    });
}
