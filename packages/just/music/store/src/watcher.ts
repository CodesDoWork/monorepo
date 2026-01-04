import { resolve } from "node:path";
import chokidar from "chokidar";
import { env } from "./env";

interface WatchActions {
    add: (path: string) => void;
    deleted: (path: string) => void;
}

export function watchMusicLibDirs({ add, deleted }: WatchActions) {
    const watcher = chokidar.watch(env.MUSIC_LIB_DIRS.split(","), { awaitWriteFinish: true });
    watcher.on("add", path => add(resolve(path))).on("unlink", path => deleted(resolve(path)));
}
