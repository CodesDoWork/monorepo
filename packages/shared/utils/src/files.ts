import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export function findNextHigherDirWith(filename: string): string {
    let dir = process.cwd();
    while (!existsSync(join(dir, filename))) {
        if (dir === "/") {
            throw new Error(`Could not find ${filename}`);
        }

        dir = dirname(dir);
    }
    return dir;
}

export function mkdir(dir: string) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}
