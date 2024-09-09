import { z } from "zod";

export interface Credentials {
    username: string;
    password: string;
}

export const zEnvValueTypes = z.union([z.string(), z.number(), z.boolean()]);
export const zEnvConfig = z.object({ env: z.record(zEnvValueTypes).optional().default({}) });

export const zSecretEnvConfig = z.union([
    z.string(),
    z.object({ name: z.string(), field: z.string().optional() }),
]);
export const zSecretCollectionConfig = z.object({
    collectionId: z.string(),
    prefix: z.boolean().optional().default(false),
    vars: z.array(zSecretEnvConfig),
});
export const zSecretsConfig = z.object({
    secrets: z.record(zSecretCollectionConfig).optional().default({}),
});

export const zProjectSecretsConfig = z.intersection(zEnvConfig, zSecretsConfig);
export const zRootSecretConfig = z.object({ server: z.string().optional() });

export type SecretEnvConfig = z.infer<typeof zSecretEnvConfig>;
export type SecretCollectionConfig = z.infer<typeof zSecretCollectionConfig>;
export type ProjectSecretsConfig = z.infer<typeof zProjectSecretsConfig>;
export type RootSecretsConfig = z.infer<typeof zRootSecretConfig>;
