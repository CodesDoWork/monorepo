import { existsSync } from "fs";
import path from "node:path";

export function searchNextDir(startDir: string, filenames: string[]): string {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        for (const file of filenames) {
            const filePath = path.join(currentDir, file);
            if (existsSync(filePath)) {
                return currentDir;
            }
        }
        currentDir = path.dirname(currentDir);
    }

    return currentDir;
}
