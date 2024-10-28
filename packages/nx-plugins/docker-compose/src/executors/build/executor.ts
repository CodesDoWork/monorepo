import { execAsync } from "@codesdowork/shared-utils";
import { PromiseExecutor, logger } from "@nx/devkit";
import { existsSync } from "fs";
import * as path from "node:path";
import { BuildExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (options, context) => {
    logger.info(context);
    try {
        const { dir, file } = defineConfigLocation(options, context.root);
        await execAsync(
            "docker",
            [
                "compose",
                file && `-f ${file}`,
                "build",
                options.service || context.projectName || "",
            ],
            { cwd: dir },
        );

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

interface ConfigLocation {
    dir: string;
    file?: string;
}

function defineConfigLocation({ config }: BuildExecutorSchema, startDir: string): ConfigLocation {
    if (config) {
        const configPath = path.parse(config);
        return {
            dir: configPath.dir,
            file: `${configPath.name}.${configPath.ext}`,
        };
    }

    return { dir: searchNextComposeDir(startDir) };
}

function searchNextComposeDir(startDir: string) {
    const composeFiles = ["docker-compose.yml", "docker-compose.yaml"];
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        for (const composeFile of composeFiles) {
            const filePath = path.join(currentDir, composeFile);
            if (existsSync(filePath)) {
                return filePath;
            }
        }
        currentDir = path.dirname(currentDir);
    }

    return currentDir;
}

export default runExecutor;
