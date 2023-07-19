import { observable } from "@trpc/server/observable";
import { exec } from "child_process";
import { procedure, router } from "shared/trpc";
import { snapshotListType, snapshotTypeZod } from "./snapshots.schema";
import { getSnapshotList } from "./getSnapshotList";
import { getRunningSnapshot } from "./getRunningSnapshot";
import { z } from "zod";

export const snapshotsRouter = router({
    createSnapshot: procedure
        .meta({ openapi: { method: "GET", path: "/createSnapshot" } })
        .input(z.object({ type: snapshotTypeZod }))
        .output(z.object({}))
        .subscription(({ input }) => {
            exec(`rsnapshot ${input.type}`);

            return currentSnapshotObservable();
        }),

    currentSnapshot: procedure
        .meta({ openapi: { method: "GET", path: "/currentSnapshot" } })
        .input(z.object({}))
        .output(z.object({}))
        .subscription(() => currentSnapshotObservable()),

    listSnapshots: procedure
        .meta({ openapi: { method: "GET", path: "/listSnapshots" } })
        .input(z.object({}))
        .output(snapshotListType)
        .query(getSnapshotList),
});

const currentSnapshotObservable = () =>
    observable(emit => {
        const timer = setInterval(() => {
            emit.next(getRunningSnapshot());
        }, 2000);

        return () => clearInterval(timer);
    });
