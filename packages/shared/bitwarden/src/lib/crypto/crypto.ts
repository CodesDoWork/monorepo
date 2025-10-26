import type { BinaryLike } from "node:crypto";
import type { RsaKey } from "./rsa-key";
import type { Secret } from "./secret";
import { constants, pbkdf2Sync, privateDecrypt, subtle } from "node:crypto";
import { ByteData } from "./byte-data";
import { SymmetricKey } from "./symmetric-key";

export function pbkdf2(paylaod: BinaryLike, salt: BinaryLike, iterations: number): ByteData {
    return new ByteData(pbkdf2Sync(paylaod, salt, iterations, 32, "sha256"));
}

export async function stretchKey(key: BufferSource): Promise<SymmetricKey> {
    const newKey = new Uint8Array(64);
    newKey.set(await hkdfExpand(key, new Uint8Array(Buffer.from("enc")), 32));
    newKey.set(await hkdfExpand(key, new Uint8Array(Buffer.from("mac")), 32), 32);
    return new SymmetricKey(Buffer.from(newKey.buffer));
}

// ref: https://tools.ietf.org/html/rfc5869
async function hkdfExpand(prk: BufferSource, info: Uint8Array, size: number): Promise<Uint8Array> {
    const alg = {
        name: "HMAC",
        hash: { name: "SHA-256" },
    };
    const importedKey = await subtle.importKey("raw", prk, alg, false, ["sign"]);
    const hashLen = 32; // sha256
    const okm = new Uint8Array(size);
    let previousT = new Uint8Array(0);
    const n = Math.ceil(size / hashLen);
    for (let i = 0; i < n; i++) {
        const t = new Uint8Array(previousT.length + info.length + 1);
        t.set(previousT);
        t.set(info, previousT.length);
        t.set([i + 1], t.length - 1);
        previousT = new Uint8Array(await subtle.sign(alg, importedKey, t.buffer));
        okm.set(previousT, i * hashLen);
    }
    return okm;
}

export async function decryptAes(
    secret: Secret,
    { encKey, macKey }: SymmetricKey,
): Promise<ByteData> {
    if (!secret.iv || !secret.payload || !secret.mac) {
        throw new Error("Invalid secret.");
    }

    const dataForMac = Buffer.concat([secret.iv.buf, secret.payload.buf]);
    const macBuffer = await computeMac(dataForMac, macKey.src);
    const macsMatch = await macsEqual(secret.mac.src, macBuffer, macKey.src);
    if (!macsMatch) {
        throw new Error("MAC check failed.");
    }

    const importedKey = await crypto.subtle.importKey(
        "raw",
        encKey.src,
        { name: "AES-CBC" },
        false,
        ["decrypt"],
    );

    return crypto.subtle
        .decrypt({ name: "AES-CBC", iv: secret.iv.src }, importedKey, secret.payload.src)
        .then(res => new ByteData(Buffer.from(res)));
}

const HMAC_ALGORITHM: HmacImportParams = {
    name: "HMAC",
    hash: { name: "SHA-256" },
};

async function computeMac(data: BufferSource, key: BufferSource) {
    const importedKey = await crypto.subtle.importKey("raw", key, HMAC_ALGORITHM, false, ["sign"]);
    return crypto.subtle.sign(HMAC_ALGORITHM, importedKey, data);
}

async function macsEqual(mac1Data: BufferSource, mac2Data: BufferSource, key: BufferSource) {
    const importedMacKey = await crypto.subtle.importKey("raw", key, HMAC_ALGORITHM, false, [
        "sign",
    ]);
    const mac1 = await crypto.subtle.sign(HMAC_ALGORITHM, importedMacKey, mac1Data);
    const mac2 = await crypto.subtle.sign(HMAC_ALGORITHM, importedMacKey, mac2Data);

    if (mac1.byteLength !== mac2.byteLength) {
        return false;
    }

    const arr1 = new Uint8Array(mac1);
    const arr2 = new Uint8Array(mac2);
    for (let i = 0; i < arr2.length; ++i) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

export function decryptRsa(secret: Secret, key: RsaKey): ByteData {
    return new ByteData(
        privateDecrypt(
            {
                key: key.pem,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha1",
            },
            secret.payload.buf,
        ),
    );
}
