import { SizeFile } from "./constants";
import { readFileSync } from "fs";
import { inSnapshotDir } from "./utils";

/**
 * Reads the sizes file and returns a Map of the directory path to its disk usage.
 */
export const getSnapshotSizes = (file: SizeFile): Map<string, number> =>
    readFileSync(inSnapshotDir(file))
        .toString()
        .split("\n")
        .map(line => line.split("\t"))
        .reduce((map, [size, path]) => map.set(path, Number(size)), new Map<string, number>());
