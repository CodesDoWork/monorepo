import { formatFiles, generateFiles, Tree } from "@nrwl/devkit";
import { join } from "path";
import inquirer from "inquirer";
import { DockerfileKind, getExtensions } from "../extensions";
import { configFile, loadWorkspaceConfig } from "../../config/config";
import { ImageVariant, WorkspaceConfig } from "../../config/config.schema";
import { cleanObject } from "../../utils/object";

export default async function (tree: Tree) {
    const config = loadWorkspaceConfig(tree.root);
    const { base, variant, organization } = await inquirer.prompt([
        {
            name: "base",
            default: config?.base ?? "node:20-alpine",
            type: "string",
            message: "Which version of node do you want to use (image or Dockerfile)?",
        },
        {
            name: "variant",
            message: "Which variant is it?",
            default: config?.variant,
            type: "list",
            choices: Object.values(ImageVariant),
        },
        {
            name: "organization",
            default: config?.organization,
            type: "string",
            message: "Organization (can be blank)",
        },
    ]);

    const { baseExtensions, workspaceExtensions, devExtensions } = await inquirer.prompt([
        {
            name: "baseExtensions",
            default: config?.baseExtensions ?? [],
            type: "checkbox",
            message: "What base extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Base, variant).map(extension => extension.name),
        },
        {
            name: "workspaceExtensions",
            default: config?.workspaceExtensions ?? [],
            type: "checkbox",
            message: "What workspace extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Workspace, variant).map(
                extension => extension.name,
            ),
        },
        {
            name: "devExtensions",
            default: config?.devExtensions ?? [],
            type: "checkbox",
            message: "What dev extensions do you want to use?",
            choices: getExtensions(DockerfileKind.Dev, variant).map(extension => extension.name),
        },
    ]);

    const newConfig: WorkspaceConfig = {
        base,
        variant,
        organization,
        baseExtensions,
        workspaceExtensions,
        devExtensions,
    };
    tree.write(configFile, JSON.stringify(cleanObject(newConfig), undefined, 2));
    generateFiles(tree, join(__dirname, "files"), "", {});

    await formatFiles(tree);
}
