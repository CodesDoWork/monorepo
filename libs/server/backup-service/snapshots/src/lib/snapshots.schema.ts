import { z } from "zod";

export enum SnapshotType {
    Alpha = "alpha",
    Beta = "beta",
    Gamma = "gamma",
    Delta = "delta",
}

export const snapshotTypeZod = z.nativeEnum(SnapshotType);

export const snapshotStatsType = z.object({
    name: z.string(),
    type: snapshotTypeZod,
    mtime: z.date(),
    totalSizeBytes: z.number(),
});

export const runningSnapshotType = z.object({
    ...snapshotStatsType.shape,
    elapsedTime: z.string(),
    startTime: z.date(),
    currentSizeBytes: z.number(),
    progress: z.number(),
});

export const snapshotListType = z.object({
    [SnapshotType.Alpha]: z.array(snapshotStatsType),
    [SnapshotType.Beta]: z.array(snapshotStatsType),
    [SnapshotType.Gamma]: z.array(snapshotStatsType),
    [SnapshotType.Delta]: z.array(snapshotStatsType),
    totalSizeBytes: z.number(),
});

export type SnapshotStats = z.infer<typeof snapshotStatsType>;
export type RunningSnapshot = z.infer<typeof runningSnapshotType>;
export type SnapshotList = z.infer<typeof snapshotListType>;
