import { z } from "zod";
import { Duration, Moment } from "moment";

export enum SnapshotType {
    Alpha = "alpha",
    Beta = "beta",
    Gamma = "gamma",
    Delta = "delta",
}

export const createSnapshotParams = z.nativeEnum(SnapshotType);

export type SnapshotStats = {
    name: string;
    type: SnapshotType;
    mtime: Moment;
    totalSizeBytes: number;
};

export type RunningSnapshot = SnapshotStats & {
    elapsedTime: Duration;
    startTime: Moment;
    currentSizeBytes: number;
    progress: number;
};

export type SnapshotList = Record<SnapshotType, SnapshotStats[]> & {
    totalSizeBytes: number;
};
