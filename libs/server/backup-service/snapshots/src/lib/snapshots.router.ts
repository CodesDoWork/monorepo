import { observable } from "@trpc/server/observable";
import { exec } from "child_process";
import { procedure, router } from "shared/trpc";
import { createSnapshotParams } from "./snapshots.schema";
import { getSnapshotList } from "./getSnapshotList";
import { getRunningSnapshot } from "./getRunningSnapshot";

export const snapshotsRouter = router({
    createSnapshot: procedure.input(createSnapshotParams).subscription(({ input }) => {
        exec(`rsnapshot ${input}`);

        return currentSnapshotObservable();
    }),

    currentSnapshot: procedure.subscription(() => currentSnapshotObservable()),

    listSnapshots: procedure.query(getSnapshotList),
});

const currentSnapshotObservable = () =>
    observable(emit => {
        const timer = setInterval(() => {
            emit.next(getRunningSnapshot());
        }, 2000);

        return () => clearInterval(timer);
    });
