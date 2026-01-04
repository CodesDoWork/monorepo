import { existsSync, linkSync, mkdirSync, renameSync, statSync } from "node:fs";
import path from "node:path";
import { env } from "./env";

const { MUSIC_STORE_DIR } = env;
export const MUSIC_STORE_PATH = path.resolve(MUSIC_STORE_DIR);

export function initStore() {
    mkdirSync(MUSIC_STORE_DIR, { recursive: true });
}

export async function ingestFile(filePath: string): Promise<boolean> {
    const storePath = resolveStorePath(filePath);
    if (storePath) {
        moveToStore(filePath, storePath);
        return true;
    }

    return false;
}

function moveToStore(filePath: string, storePath: string) {
    renameSync(filePath, storePath);
    linkSync(storePath, filePath);
}

function resolveStorePath(filePath: string): string | false {
    const fileName = path.basename(filePath);
    const normalPath = path.join(MUSIC_STORE_DIR, fileName);

    let storePath = normalPath;
    while (true) {
        if (!existsSync(storePath)) {
            return storePath;
        }

        if (areHardLinked(filePath, storePath)) {
            return false;
        }

        storePath = buildDuplicateStorePath(storePath);
    }
}

function buildDuplicateStorePath(filePath: string): string {
    const { name, ext } = path.parse(filePath);
    const duplicateFileName = `${name}_[duplicate]${ext}`;
    return path.join(MUSIC_STORE_DIR, duplicateFileName);
}

function areHardLinked(a: string, b: string): boolean {
    const statA = statSync(a);
    const statB = statSync(b);

    return statA.ino === statB.ino && statA.dev === statB.dev;
}
