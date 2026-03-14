export class ScanState {
    private _newlyAddedFiles = 0;
    private _alreadyIngestedFiles = 0;
    private pendingJobs = 0;
    private _done = false;

    incrementPending() {
        ++this.pendingJobs;
    }

    decrementPending() {
        if (this.pendingJobs > 0) {
            --this.pendingJobs;
        }
    }

    incrementNewlyAddedFiles() {
        ++this._newlyAddedFiles;
    }

    incrementAlreadyIngestedFiles() {
        ++this._alreadyIngestedFiles;
    }

    markDone() {
        this._done = true;
    }

    hasPendingJobs(): boolean {
        return this.pendingJobs > 0;
    }

    get isRunning() {
        return !this._done || this.hasPendingJobs();
    }

    get newlyAddedFiles() {
        return this._newlyAddedFiles;
    }

    get alreadyIngestedFiles() {
        return this._alreadyIngestedFiles;
    }

    handleIngest(wasIngested: boolean) {
        this.decrementPending();
        wasIngested ? this.incrementNewlyAddedFiles() : this.incrementAlreadyIngestedFiles();
    }
}
