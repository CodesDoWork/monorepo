import { Directory } from "./constants";
import moment from "moment/moment";
import { statSync } from "fs";

export const inSnapshotDir = (name: string) => `${Directory.Snapshots}${name}`;

export const getMTime = (name: string) => moment(statSync(inSnapshotDir(name)).mtime).toDate();
