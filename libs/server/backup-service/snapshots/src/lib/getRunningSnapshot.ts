import { RunningSnapshot, SnapshotType } from "./snapshots.schema";
import moment from "moment";
import { Directory, rsnapshotCommand, SizeFile } from "./constants";
import { execSync } from "child_process";
import { getMTime, inSnapshotDir } from "./utils";
import { getSnapshotSizes } from "./getSnapshotSizes";

export const getRunningSnapshot = (): RunningSnapshot | null => {
    const psOutput = execSync("ps -o etime,args").toString();
    const rsnapshotLine = psOutput.split("\n").find(line => line.includes(rsnapshotCommand));
    if (!rsnapshotLine) {
        return null;
    }

    const [elapsed, ...command] = rsnapshotLine.split(" ").filter(Boolean);
    const type = command.pop() as SnapshotType;
    const name = `${type}.0`;
    const elapsedTime = moment.duration(`${elapsed}:00`);
    const startTime = moment().subtract(elapsedTime);

    const mtime = getMTime(name);
    const currentSizeBytes = getFileSizeBytes(inSnapshotDir(name));
    const totalSizeBytes =
        getSnapshotSizes(SizeFile.Data).get(Directory.Data) || Number.POSITIVE_INFINITY;

    return {
        type,
        name,
        mtime,
        startTime: startTime.toDate(),
        elapsedTime: elapsedTime.humanize(),
        totalSizeBytes,
        currentSizeBytes,
        progress: currentSizeBytes / totalSizeBytes,
    };
};

const getFileSizeBytes = (path: string): number => {
    const output = execSync(`du -s ${path}`).toString();
    return Number(output.split("\t")[0]) * 1024;
};
