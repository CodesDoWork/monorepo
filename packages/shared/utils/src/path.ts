import { existsSync } from "node:fs";
import path from "node:path";

export function searchNextDir(startDir: string, filenames: string[]): string {
    let currentDir = startDir;
    while (!isRoot(currentDir)) {
        if (containsAnyFile(currentDir, filenames)) {
            return currentDir;
        }

        currentDir = path.dirname(currentDir);
    }

    return currentDir;
}

function containsAnyFile(dir: string, filenames: string[]): boolean {
    return filenames.some(file => existsSync(path.join(dir, file)));
}

function isRoot(dir: string): boolean {
    return dir === path.parse(dir).root;
}
