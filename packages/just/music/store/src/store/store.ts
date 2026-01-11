import {
    existsSync,
    linkSync,
    mkdirSync,
    readdirSync,
    renameSync,
    rmSync,
    statSync,
} from "node:fs";
import path from "node:path";
import { createLogger } from "@cdw/monorepo/shared-logging";
import { env } from "../env";
import { areHardLinked, hashFile, isLastLink } from "./file-utils";
import { InodeStorePaths } from "./inode-store-paths";
import { normalizeGainIfNecessary } from "./r128gain";

const logger = createLogger("store");

const { STORE_DIR } = env;

const storePaths: Record<string, string> = {};
const inodeStorePaths = new InodeStorePaths();

export function initStore() {
    if (!existsSync(STORE_DIR)) {
        mkdirSync(STORE_DIR, { recursive: true });
    }

    cleanAndIndexStore();
}

export async function ingestFile(filePath: string): Promise<boolean> {
    await normalizeGainIfNecessary(filePath);
    const storePath = await buildStorePath(filePath);
    storePaths[filePath] = storePath;
    const isNew = moveToStoreIfNew(filePath, storePath);

    inodeStorePaths.add(storePath);
    removeDuplicateStoreFiles(storePath);

    return isNew;
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

function cleanAndIndexStore() {
    readdirSync(STORE_DIR).forEach(file => {
        const storePath = path.join(STORE_DIR, file);
        const removed = rmIfLastLink(storePath);
        if (!removed) {
            inodeStorePaths.add(storePath);
        }
    });
}

function rmIfLastLink(storePath: string): boolean {
    if (isLastLink(storePath)) {
        removeFromStore(storePath);
        return true;
    }

    return false;
}

async function buildStorePath(filePath: string): Promise<string> {
    const { size } = statSync(filePath);
    const { ext } = path.parse(filePath);
    const hash = await hashFile(filePath);
    return path.join(STORE_DIR, `${size}_${hash}${ext}`);
}

function moveToStoreIfNew(filePath: string, storePath: string): boolean {
    const shouldBeLinked = moveToStore(filePath, storePath);
    if (shouldBeLinked) {
        linkSync(storePath, filePath);
    }

    return shouldBeLinked;
}

function moveToStore(from: string, to: string): boolean {
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

function removeDuplicateStoreFiles(storePath: string) {
    inodeStorePaths.getSameInodePaths(storePath).forEach(path => {
        if (path !== storePath) {
            removeFromStore(path);
        }
    });
}

function removeFromStore(storePath: string) {
    inodeStorePaths.remove(storePath);
    rmSync(storePath);
    logger.info(`Removed store file: ${storePath}`);
}
