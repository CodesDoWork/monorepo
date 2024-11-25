export class RsaKey {
    public readonly pem: string;
    constructor(public readonly keyData: Buffer) {
        this.pem = RsaKey.convertToPem(keyData);
    }

    private static convertToPem(keyData: Buffer): string {
        const base64Key = keyData.toString("base64");
        const formattedKey = base64Key.match(/.{1,64}/g)?.join("\n");
        return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
    }
}
