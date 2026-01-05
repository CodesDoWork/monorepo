import { logger } from "@cdw/monorepo/shared-logging";
import { ScanState } from "./scan-state";
import { ingestFile, initStore, removeFromStoreIfLastLink } from "./store";
import { watchMusicLibDirs } from "./watcher";

const initialScan = new ScanState();

initStore();
watchMusicLibDirs({
    add,
    remove,
    ready,
});

function add(path: string) {
    if (!initialScan.done) {
        initialScan.incrementPending();
    }

    ingestFile(path)
        .then(wasIngested => {
            if (!initialScan.done || initialScan.hasPendingJobs()) {
                initialScan.decrementPending();
                wasIngested
                    ? initialScan.incrementNewlyAddedFiles()
                    : initialScan.incrementAlreadyIngestedFiles();
            } else {
                logger.info((wasIngested ? "Ingested: " : "Skipped ingest: ") + path);
            }
        })
        .catch(err => {
            initialScan.decrementPending();
            logger.error(err);
        });
}

function remove(path: string) {
    removeFromStoreIfLastLink(path).then(wasRemoved =>
        logger.info((wasRemoved ? "Removed: " : "Skipped remove: ") + path),
    );
}

function ready() {
    initialScan.markDone();
    if (initialScan.hasPendingJobs()) {
        setTimeout(ready, 100);
        return;
    }

    logger.info(
        `Initial scan complete. Ingested ${initialScan.newlyAddedFiles} files. Already ingested ${initialScan.alreadyIngestedFiles} files.`,
    );
}
