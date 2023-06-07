import { generateFiles, Tree } from "@nrwl/devkit";
import { DockerfileArea, DockerfileKind } from "../extensions";
import { generateFilesInstant, joinTruthy } from "../../utils/files";

export const convertTemplates = (
    tree: Tree,
    target: string,
    kind: DockerfileKind,
    options: Record<string, unknown>,
    isInstant = false,
    appVariant?: string,
) => {
    Object.values(DockerfileArea).forEach(area => {
        if (area in options) {
            options[area] = `\n${options[area]}\n`;
        } else {
            options[area] = "";
        }
    });

    const generate = isInstant ? generateFilesInstant : generateFiles;
    generate(tree, joinTruthy(__dirname, "files", kind, appVariant), target, {
        template: "",
        argsAndEnvs: makeArgsAndEnvs(),
        ...options,
    });
};

const makeArgsAndEnvs = () => ["ARG VERSION", "ENV PACKAGE_VERSION $VERSION"].join("\n");
