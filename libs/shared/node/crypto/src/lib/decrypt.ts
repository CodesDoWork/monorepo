import crypto from "crypto";

export const decrypt = (text: string, secret: string): string => {
    const { iv, authTag, encrypted } = getParamsFromString(text);

    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(secret), iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted.toString("utf8");
};

const getParamsFromString = (text: string) => {
    const [ivHex, authTagHex, ...encryptedHex] = text.split(":");
    if (!ivHex || !authTagHex || !encryptedHex.length) {
        throw new Error("Invalid encrypted text format");
    }

    return {
        iv: hexToBuffer(ivHex),
        authTag: hexToBuffer(authTagHex),
        encrypted: hexToBuffer(encryptedHex.join(":")),
    };
};

const hexToBuffer = (hex: string) => Buffer.from(hex, "hex");
