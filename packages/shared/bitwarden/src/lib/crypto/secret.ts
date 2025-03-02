import type { BitwardenClient } from "../client";
import type { EncryptionType } from "./encryption-type";
import { ByteData } from "./byte-data";

export class Secret {
    public readonly encType: EncryptionType;
    public readonly iv?: ByteData;
    public readonly payload: ByteData;
    public readonly mac?: ByteData;

    private value: ByteData | undefined = undefined;

    constructor(
        private readonly client: BitwardenClient,
        public readonly display: string,
        public readonly organizationId: string | null = null,
    ) {
        const [encType, key] = display.split(".");
        const keyInfos
            = key?.split("|").map(info => new ByteData(Buffer.from(info, "base64"))) || [];

        if (!encType || !key || !keyInfos.length) {
            throw new Error("Invalid secret");
        }

        this.encType = +encType;
        if (keyInfos.length === 3) {
            const [iv, payload, mac] = keyInfos;
            this.iv = iv;
            this.payload = payload as ByteData;
            this.mac = mac;
        } else if (keyInfos.length === 1) {
            this.payload = keyInfos[0] as ByteData;
        } else {
            throw new Error("Invalid secret");
        }
    }

    public async getValue(): Promise<ByteData> {
        if (!this.value) {
            this.value = await this.client.decrypt(this);
        }

        return this.value;
    }
}
