export class ByteData {
    public readonly b64: string;
    public readonly str: string;
    constructor(public readonly buf: Buffer) {
        this.b64 = buf.toString("base64");
        this.str = buf.toString();
    }
}
