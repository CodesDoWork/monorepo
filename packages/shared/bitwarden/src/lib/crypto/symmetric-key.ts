import { ByteData } from "./byte-data";

export class SymmetricKey {
    key: ByteData;
    encKey: ByteData;
    macKey: ByteData;

    constructor(buf: Buffer) {
        this.key = new ByteData(buf);

        const encKey = this.key.buf.subarray(0, this.key.buf.length / 2);
        this.encKey = new ByteData(encKey);

        const macKey = this.key.buf.subarray(this.key.buf.length / 2);
        this.macKey = new ByteData(macKey);
    }
}
