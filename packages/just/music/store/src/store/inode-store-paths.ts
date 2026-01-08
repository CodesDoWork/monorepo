import { statSync } from "node:fs";

export class InodeStorePaths {
    private readonly inodePaths: Map<number, Set<string>> = new Map();

    add(path: string) {
        const inode = getInode(path);
        if (!this.inodePaths.has(inode)) {
            this.inodePaths.set(inode, new Set());
        }
        this.inodePaths.get(inode)?.add(path);
    }

    remove(path: string) {
        const inode = getInode(path);
        this.inodePaths.get(inode)?.delete(path);
    }

    getSameInodePaths(path: string): string[] {
        return this.inodePaths.get(getInode(path))?.values().toArray() || [];
    }
}

function getInode(path: string): number {
    return statSync(path).ino;
}
