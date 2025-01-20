import { Dirent, readdirSync } from "node:fs";
import path from "node:path";

export async function forEachProjectFile(
    dirPath: string,
    callback: (dirPath: string, item: Dirent, depth: number) => void | Promise<void>,
    depth = 0,
) {
    for (const item of readdirSync(dirPath, { withFileTypes: true })) {
        await callback(dirPath, item, depth);
        if (item.isDirectory() && (item.name !== "generated" || depth)) {
            await forEachProjectFile(path.join(dirPath, item.name), callback, depth + 1);
        }
    }
}
