import { resolve } from "node:path";
import chokidar from "chokidar";
import { env } from "./env";

interface WatchActions {
    add: (path: string) => void;
    remove: (path: string) => void;
    ready: () => void;
}

export function watchMusicLibDirs({ add, remove, ready }: WatchActions) {
    const watcher = chokidar.watch(env.MUSIC_LIB_DIRS.split(","), {
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100,
        },
    });
    watcher
        .on("add", path => add(resolve(path)))
        .on("change", path => add(resolve(path)))
        .on("unlink", path => remove(resolve(path)))
        .on("ready", ready);
}
