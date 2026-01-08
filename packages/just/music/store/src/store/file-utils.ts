import crypto from "node:crypto";
import { createReadStream, statSync } from "node:fs";

export function areHardLinked(file1: string, file2: string): boolean {
    const stat1 = statSync(file1);
    const stat2 = statSync(file2);

    return stat1.ino === stat2.ino && stat1.dev === stat2.dev;
}

export function hashFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const stream = createReadStream(filePath);
        stream.on("data", d => hash.update(d));
        stream.on("end", () => resolve(hash.digest("hex")));
        stream.on("error", reject);
    });
}

export function isLastLink(path: string): boolean {
    try {
        return statSync(path).nlink === 1;
    } catch (err) {
        if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
            return false;
        }

        throw err;
    }
}
