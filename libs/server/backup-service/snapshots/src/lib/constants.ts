export enum Directory {
    Snapshots = "/.snapshots/",
    Data = "/data/",
}

export enum SizeFile {
    Data = "dataSize",
    Snapshots = "snapshotSizes",
}

export const rsnapshotCommand = "{rsnapshot} /usr/bin/perl -w /usr/bin/rsnapshot ";
