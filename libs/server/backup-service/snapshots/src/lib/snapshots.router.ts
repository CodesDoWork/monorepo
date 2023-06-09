import { observable } from "@trpc/server/observable";
import { exec } from "child_process";
import { publicProcedure, router } from "shared/trpc";
import { createSnapshotParams } from "./snapshots.schema";
import { getSnapshotList } from "./getSnapshotList";
import { getRunningSnapshot } from "./getRunningSnapshot";

export const snapshotsRouter = router({
    createSnapshot: publicProcedure
        .meta({
            openapi: { method: "GET", path: "/createSnapshot" },
        })
        .input(createSnapshotParams)
        .subscription(({ input }) => {
            exec(`rsnapshot ${input}`);

            return currentSnapshotObservable();
        }),

    currentSnapshot: publicProcedure
        .meta({
            openapi: { method: "GET", path: "/currentSnapshot" },
        })
        .subscription(() => currentSnapshotObservable()),

    listSnapshots: publicProcedure
        .meta({
            openapi: { method: "GET", path: "/listSnapshots" },
        })
        .query(getSnapshotList),
});

const currentSnapshotObservable = () =>
    observable(emit => {
        const timer = setInterval(() => {
            emit.next(getRunningSnapshot());
        }, 2000);

        return () => clearInterval(timer);
    });
