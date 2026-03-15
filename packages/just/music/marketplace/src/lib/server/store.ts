import type { Track } from "../common/track";
import { statSync } from "node:fs";
import { basename, join } from "node:path";
import { isMusicFile } from "@cdw/monorepo/just-music-utils";
import { createLogger } from "@cdw/monorepo/shared-logging";
import { watchDirs } from "@cdw/monorepo/shared-utils/file-watcher";
import { parseFile } from "music-metadata";
import { env } from "../../env";

const logger = createLogger("store");

let storeReady = false;
export function isStoreReady(): boolean {
    return storeReady;
}

const pathInodes = new Map<string, number>();
const tracks = new Map<number, Track>();
export function getTracks(): readonly Track[] {
    return tracks.values().toArray();
}

const inflight = new Map<number, Promise<void>>();

watchDirs(
    { add, remove, ready },
    env.STORE_DIR,
    ...env.LIBS.split(",").map(lib => join(env.LIBS_DIR, lib)),
);

function add(path: string): Promise<void> {
    if (isMusicFile(path)) {
        return addMusicFile(path);
    }

    return Promise.resolve();
}

async function addMusicFile(path: string): Promise<void> {
    logger.info(`New file: ${path}`);

    const inode = getInode(path);
    pathInodes.set(path, inode);
    if (tracks.has(inode)) {
        ingestSong(path, inode, tracks.get(inode)?.paths);
    } else if (inflight.has(inode)) {
        await addPathToInflight(path, inode);
    } else {
        ingestSong(path, inode);
    }
}

async function addPathToInflight(path: string, inode: number) {
    await inflight.get(inode);
    const track = tracks.get(inode);
    if (track && !track.paths.includes(path)) {
        track.paths.push(path);
        if (path.startsWith(env.STORE_DIR)) {
            track.storeFile = basename(path);
        }
    }
}

function ingestSong(path: string, inode: number, paths?: string[]) {
    inflight.set(
        inode,
        new Promise<void>(resolve => {
            parseFile(path).then(metadata => {
                const { common, format } = metadata;
                const { title, artist, genre, year, album, disk, track } = common;
                const { bitrate, duration } = format;
                paths = paths ? [...paths, path] : [path];
                const storePath = paths.find(p => p.startsWith(env.STORE_DIR));
                tracks.set(inode, {
                    paths,
                    storeFile: storePath ? basename(storePath) : undefined,
                    meta: {
                        title,
                        artist,
                        genre,
                        year,
                        album,
                        diskNo: disk.no,
                        diskOf: disk.of,
                        trackNo: track.no,
                        trackOf: track.of,
                        bitrate,
                        duration,
                    },
                });
                resolve();
            });
        }).finally(() => {
            inflight.delete(inode);
        }),
    );
}

function remove(path: string) {
    if (isMusicFile(path)) {
        removeMusicFile(path);
    }
}

function removeMusicFile(path: string) {
    logger.info(`Removed file: ${path}`);

    const inode = pathInodes.get(path);
    pathInodes.delete(path);
    if (inode) {
        removeTrackIfNotUsed(path, inode);
    }
}

function removeTrackIfNotUsed(path: string, inode: number) {
    const track = tracks.get(inode);
    if (track) {
        track.paths = track.paths.filter(p => p !== path);
        if (!track.paths.length || !track.paths.some(p => p.startsWith(env.STORE_DIR))) {
            tracks.delete(inode);
        }
    }
}

function ready() {
    logger.info("store initialized");
    storeReady = true;
}

function getInode(path: string): number {
    return statSync(path).ino;
}
