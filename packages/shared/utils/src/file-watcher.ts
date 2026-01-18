import { resolve } from "node:path";
import chokidar from "chokidar";

interface WatchActions {
    add: (path: string) => void;
    remove: (path: string) => void;
    ready: () => void;
}

export function watchDirs({ add, remove, ready }: WatchActions, ...dirs: string[]) {
    const watcher = chokidar.watch(dirs, {
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
