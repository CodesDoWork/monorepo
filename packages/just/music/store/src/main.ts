import { logger } from "@cdw/monorepo/shared-logging";
import { ingestFile, initStore } from "./store";
import { watchMusicLibDirs } from "./watcher";

initStore();
watchMusicLibDirs({
    add,
    deleted: path => logger.info(`deleted: ${path}`),
});

function add(path: string) {
    ingestFile(path).then(wasIngested =>
        logger.info((wasIngested ? "Added:   " : "Skipped: ") + path),
    );
}
