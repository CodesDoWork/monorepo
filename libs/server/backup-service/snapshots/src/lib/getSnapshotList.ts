import { SnapshotList, SnapshotType } from "./snapshots.schema";
import { readdirSync, statSync } from "fs";
import { Directory, SizeFile } from "./constants";
import { getMTime, inSnapshotDir } from "./utils";
import { getSnapshotSizes } from "./sizes";

export const getSnapshotList = (): SnapshotList => {
    const snapshotSizes = getSnapshotSizes(SizeFile.Snapshots);
    const result: SnapshotList = {
        [SnapshotType.Alpha]: [],
        [SnapshotType.Beta]: [],
        [SnapshotType.Gamma]: [],
        [SnapshotType.Delta]: [],
        totalSizeBytes: snapshotSizes.get(Directory.Snapshots) || 0,
    };

    readdirSync(Directory.Snapshots).forEach(file => {
        const path = inSnapshotDir(file);
        if (statSync(path).isDirectory()) {
            const type = file.split(".")[0] as SnapshotType;
            const mtime = getMTime(file);
            const totalSizeBytes = snapshotSizes.get(path) || 0;

            result[type].push({
                name: file,
                type,
                mtime,
                totalSizeBytes,
            });
        }
    });

    return result;
};
