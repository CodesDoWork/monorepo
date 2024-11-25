import { Cipher, Field, Secret } from "@codesdowork/shared-bitwarden";
import { SecretEnvConfig } from "./types";

export function getSecretFieldName(config: SecretEnvConfig): string {
    if (typeof config === "string") {
        return config.toLowerCase().replace(/_/g, "");
    }

    return config.field || getSecretFieldName(config.name);
}

export async function getCipherSecret(cipher: Cipher, field: string): Promise<string | undefined> {
    let secret: Secret | null;
    if (isLoginField(field)) {
        secret = cipher.login[field];
    } else {
        const fields: Record<string, Field> = {};
        for (const field of cipher.fields) {
            const fieldName = await field.name.getValue();
            fields[fieldName.str.toLowerCase()] = field;
        }

        secret = fields[field]?.value ?? null;
    }

    return secret ? secret.getValue().then(val => val.str) : undefined;
}

export function isLoginField(field: string): field is "username" | "password" {
    return ["username", "password"].includes(field);
}

type KeyToSecret<T> = keyof {
    [K in keyof T as T[K] extends Secret ? K : never]: T[K];
};

export async function mapToRecord<T, K extends KeyToSecret<T>>(
    items: T[],
    keyToSecret: K,
): Promise<Record<string, T>> {
    const result: Record<string, T> = {};
    for (const item of items) {
        const name = await (item[keyToSecret] as Secret).getValue();
        result[name.str] = item;
    }

    return result;
}
