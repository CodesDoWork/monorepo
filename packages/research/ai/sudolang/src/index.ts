#!/usr/bin/env node

import { program } from "commander";
import fileSelector from "inquirer-file-selector";
import path from "node:path";
import { transpileSudoLangProject } from "./transpile";

program
    .name("sudo-codegen")
    .version("1.0.0")
    .description("Generates code based on SudoLang language.")
    .argument("[directory]", "Project dir to compile")
    .action(async directory => {
        directory = await ensureDir(directory);
        directory = path.isAbsolute(directory) ? directory : path.join(process.cwd(), directory);
        await transpileSudoLangProject(directory);
    });

program.parse(process.argv);

function ensureDir(dir: string | undefined): Promise<string> {
    if (dir) {
        return Promise.resolve(dir);
    }

    return fileSelector({
        message: "Select a project directory",
        type: "directory",
        allowCancel: true,
        filter: file => file.isDirectory(),
    });
}
