import { z } from "zod";

export enum BitwardenInfoKey {
    ORGANIZATION_NAME = "ORGANIZATION_NAME",
    PROJECT_NAME = "PROJECT_NAME",
}

export const zExtendsConfig = z.object({ extends: z.string().optional() });

export const zEnvValueTypes = z.union([z.string(), z.number(), z.boolean()]);
export const zEnvConfig = z.object({ env: z.record(zEnvValueTypes).default({}) });

export const zBitwardenInfoKeys = z.nativeEnum(BitwardenInfoKey);
export const zBirwardenInfo = z.union([
    zBitwardenInfoKeys,
    z.object({ name: z.string(), value: zBitwardenInfoKeys }).strict(),
]);
export const zBitwardenInfosConfig = z
    .object({ bitwardenInfos: z.array(zBirwardenInfo).default([]) })
    .strict();

export const zSecretEnvObjectConfig = z
    .object({ name: z.string(), field: z.string().optional(), file: z.string().optional() })
    .strict();
export const zSecretEnvConfig = z.union([z.string(), zSecretEnvObjectConfig]);
export const zSecretCollectionConfig = z
    .object({
        prefix: z.boolean().optional().default(false),
        vars: z.array(zSecretEnvConfig),
    })
    .strict();
export const zSecretsConfig = z.record(zSecretCollectionConfig);
export const zSecretsConfigObj = z.object({
    secrets: z.record(zSecretCollectionConfig).default({}),
});

export const zProjectSecretsConfig = zExtendsConfig
    .merge(zBitwardenInfosConfig)
    .merge(zEnvConfig)
    .merge(zSecretsConfigObj)
    .strict();
export const zRootSecretConfig = z
    .object({
        server: z.string().default("vault.bitwarden.com"),
        organizationId: z.string(),
        rootCollectionId: z.string(),
    })
    .strict();

export type BitwardenInfo = z.infer<typeof zBirwardenInfo>;
export type SecretsConfig = z.infer<typeof zSecretsConfig>;
export type SecretEnvConfig = z.infer<typeof zSecretEnvConfig>;
export type ProjectSecretsConfig = z.infer<typeof zProjectSecretsConfig>;
export type RootSecretsConfig = z.infer<typeof zRootSecretConfig>;
