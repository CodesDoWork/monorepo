export enum EncryptionType {
    AesCbc256,
    AesCbc128_HmacSha256,
    AesCbc256_HmacSha256,
    Rsa2048_OaepSha256,
    Rsa2048_OaepSha1,
    Rsa2048_OaepSha256_HmacSha256,
    Rsa2048_OaepSha1_HmacSha256,
}

export const aesEncryptionTypes = [
    EncryptionType.AesCbc256,
    EncryptionType.AesCbc128_HmacSha256,
    EncryptionType.AesCbc256_HmacSha256,
];

export const rsaEncryptionTypes = [
    EncryptionType.Rsa2048_OaepSha256,
    EncryptionType.Rsa2048_OaepSha1,
    EncryptionType.Rsa2048_OaepSha256_HmacSha256,
    EncryptionType.Rsa2048_OaepSha1_HmacSha256,
];
