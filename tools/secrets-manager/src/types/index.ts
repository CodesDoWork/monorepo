import { z } from "zod";

export interface Credentials {
    username: string;
    password: string;
}

export const zSecretConfig = z.union([
    z.string(),
    z.object({ name: z.string(), field: z.string().optional() }),
]);
export const zProjectSecretsConfig = z.record(z.array(zSecretConfig));
export const zRootSecretConfig = z.object({ server: z.string().optional() });

export type SecretConfig = z.infer<typeof zSecretConfig>;
export type ProjectSecretsConfig = z.infer<typeof zProjectSecretsConfig>;
export type RootSecretsConfig = z.infer<typeof zRootSecretConfig>;
