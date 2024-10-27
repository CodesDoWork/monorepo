// from https://github.com/bitwarden/clients/blob/main/libs/common/src/vault/models/data/cipher.data.ts

export interface CipherData {
    id: string;
    organizationId: string;
    folderId: string;
    edit: boolean;
    viewPassword: boolean;
    organizationUseTotp: boolean;
    favorite: boolean;
    revisionDate: string;
    type: unknown;
    name: string;
    notes: string;
    login?: LoginData;
    secureNote?: unknown;
    card?: unknown;
    identity?: unknown;
    fields?: FieldData[];
    attachments?: unknown[];
    passwordHistory?: unknown[];
    collectionIds?: string[];
    creationDate: string;
    deletedDate: string;
    reprompt: unknown;
    key: string;
}

export interface LoginData {
    uris: unknown[];
    username: string;
    password: string;
    passwordRevisionDate: string;
    totp: string;
    autofillOnPageLoad: boolean;
    fido2Credentials?: unknown[];
}

export interface FieldData {
    type: unknown;
    name: string;
    value: string;
    linkedId: unknown;
}
