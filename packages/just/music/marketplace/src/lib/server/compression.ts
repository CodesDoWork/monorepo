import { gzipSync } from "node:zlib";

export function compressAndEncode(data: object): string {
    const jsonString = JSON.stringify(data);
    const compressedBuffer = gzipSync(Buffer.from(jsonString), { level: 9 });
    return compressedBuffer.toString("base64");
}
