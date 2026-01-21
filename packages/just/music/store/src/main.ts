import { join } from "node:path";
import { isMusicFile } from "@cdw/monorepo/just-music-utils";
import { logger } from "@cdw/monorepo/shared-logging";
import { watchDirs } from "@cdw/monorepo/shared-utils/file-watcher";
import { env } from "./env";
import { ScanState } from "./scan-state";
import { ingestFile, initStore, removeFromStoreIfLastLink } from "./store";

const initialScan = new ScanState();

initStore();
watchDirs(
    {
        add,
        remove,
        ready,
    },
    ...env.LIBS.split(",").map(lib => join(env.LIBS_DIR, lib)),
);

function add(path: string) {
    if (!isMusicFile(path)) {
        return;
    }

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
    if (isMusicFile(path)) {
        removeFromStoreIfLastLink(path);
    }
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
