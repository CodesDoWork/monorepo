import { mergeRouters } from "shared/trpc";
import { snapshotsRouter } from "server/backup-service/snapshots";

export const appRouter = mergeRouters(snapshotsRouter);
