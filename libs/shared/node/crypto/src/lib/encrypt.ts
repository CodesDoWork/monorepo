import crypto from "crypto";

const IV_BYTES = 16;

export const encrypt = (text: string, secret: string): string => {
    const iv = crypto.randomBytes(IV_BYTES);
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(secret, "base64"), iv);
    const encrypted = cipher.update(text, "utf-8", "hex") + cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};
