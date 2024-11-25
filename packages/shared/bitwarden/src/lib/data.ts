import { Secret } from "./crypto";

export interface BitwardenData {
    ciphers: Cipher[];
    collections: Collection[];
    profile: Profile;
}

export interface Cipher {
    collectionIds: string[];
    fields: Field[];
    id: string;
    login: {
        username: Secret | null;
        password: Secret | null;
    };
    name: Secret;
    organizationId: string | null;
}

export interface Field {
    name: Secret;
    value: Secret;
}

export interface Collection {
    id: string;
    name: Secret;
    organizationId: string | null;
}

export interface Profile {
    organizations: Organization[];
}

export interface Organization {
    id: string;
    name: string;
}
