import fileSelector from "inquirer-file-selector";
import { existsSync, readFileSync } from "node:fs";
import path from "path";
import { z } from "zod";
import { forEachProjectFile } from "./tree";

export const projectConfigFile = "sudo-codegen.config.json";

const zProjectConfig = z
    .object({
        projectName: z.string(),
        description: z.string(),
        targets: z.record(z.string(), z.string()),
        requirements: z.array(z.string()),
        fileStructure: z.string().optional(),
    })
    .strict();

export type ProjectConfig = z.infer<typeof zProjectConfig>;

export async function getProjectConfig(dir: string): Promise<ProjectConfig> {
    let configFile = path.join(dir, projectConfigFile);
    if (!existsSync(configFile)) {
        configFile = await fileSelector({
            message: `No "${projectConfigFile}" file found. Please select a project config file.`,
            type: "file",
            filter: file => file.name.endsWith(".sudo"),
        });
    }

    const configJSON = readFileSync(configFile, "utf-8").toString();
    const config = zProjectConfig.parse(JSON.parse(configJSON));
    config.fileStructure = await getProjectStructure(dir);

    return config;
}

/**
 * Generates an AI-readable string representation of a directory structure,
 * including only .sudo files.
 *
 * @param dirPath - The directory to scan.
 * @returns A formatted string representing the structure.
 */
async function getProjectStructure(dirPath: string): Promise<string> {
    const result: string[] = [];
    await forEachProjectFile(dirPath, (_, item, depth) => {
        const indent = " ".repeat(2).repeat(depth);
        if (item.isDirectory()) {
            result.push(`${indent}${item.name}/`);
        } else if (item.isFile() && item.name.endsWith(".sudo")) {
            result.push(indent + item.name);
        }
    });

    return result.join("\n");
}
