import { existsSync } from "fs";
import path from "node:path";

export function searchNextComposeDir(startDir: string) {
    const composeFiles = ["docker-compose.yml", "docker-compose.yaml"];
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        for (const composeFile of composeFiles) {
            const filePath = path.join(currentDir, composeFile);
            if (existsSync(filePath)) {
                return currentDir;
            }
        }
        currentDir = path.dirname(currentDir);
    }

    return currentDir;
}
