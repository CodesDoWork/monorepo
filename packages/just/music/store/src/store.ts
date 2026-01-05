import crypto from "node:crypto";
import {
    createReadStream,
    existsSync,
    linkSync,
    mkdirSync,
    readdirSync,
    renameSync,
    rmSync,
    statSync,
} from "node:fs";
import path from "node:path";
import { env } from "./env";

const { MUSIC_STORE_DIR } = env;
export const MUSIC_STORE_PATH = path.resolve(MUSIC_STORE_DIR);

const storePaths: Record<string, string> = {};

export function initStore() {
    if (!existsSync(MUSIC_STORE_DIR)) {
        mkdirSync(MUSIC_STORE_DIR, { recursive: true });
    }

    cleanStore();
}

export async function ingestFile(filePath: string): Promise<boolean> {
    const storePath = await buildStorePath(filePath);
    storePaths[filePath] = storePath;
    return moveToStore(filePath, storePath);
}

export async function removeFromStoreIfLastLink(filePath: string): Promise<boolean> {
    const storePath = storePaths[filePath];
    if (!storePath) {
        throw new Error(`No store path found for ${filePath}`);
    }

    const removed = rmIfLastLink(storePath);
    if (removed) {
        delete storePaths[filePath];
    }

    return removed;
}

function cleanStore() {
    readdirSync(MUSIC_STORE_DIR).forEach(file => rmIfLastLink(path.join(MUSIC_STORE_DIR, file)));
}

async function buildStorePath(filePath: string): Promise<string> {
    const { size } = statSync(filePath);
    const { ext } = path.parse(filePath);
    const hash = await hashFile(filePath);
    return path.join(MUSIC_STORE_DIR, `${size}_${hash}${ext}`);
}

function moveToStore(filePath: string, storePath: string): boolean {
    const shouldBeLinked = move(filePath, storePath);
    if (shouldBeLinked) {
        linkSync(storePath, filePath);
    }

    return shouldBeLinked;
}

function move(from: string, to: string): boolean {
    if (!existsSync(to)) {
        renameSync(from, to);
        return true;
    }

    if (areHardLinked(from, to)) {
        return false;
    }

    // files share same name (key) -> identical
    rmSync(from);
    return true;
}

function areHardLinked(file1: string, file2: string): boolean {
    const stat1 = statSync(file1);
    const stat2 = statSync(file2);

    return stat1.ino === stat2.ino && stat1.dev === stat2.dev;
}

function hashFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const stream = createReadStream(filePath);
        stream.on("data", d => hash.update(d));
        stream.on("end", () => resolve(hash.digest("hex")));
        stream.on("error", reject);
    });
}

function isLastLink(path: string): boolean {
    return statSync(path).nlink === 1;
}

function rmIfLastLink(storePath: string): boolean {
    if (isLastLink(storePath)) {
        rmSync(storePath);
        return true;
    }

    return false;
}
