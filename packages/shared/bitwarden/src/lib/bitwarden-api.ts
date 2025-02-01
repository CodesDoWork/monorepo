export interface BitwardenApi {
    "/identity/accounts/prelogin": {
        data: {
            email: string;
        };
        response: {
            kdf: number;
            kdfIterations: number;
            kdfMemory: unknown;
            kdfParallelism: unknown;
        };
    };
    "/identity/connect/token": {
        data: {
            grant_type: "password";
            username: string;
            password: string;
            scope: string;
            client_id: "web";
            deviceIdentifier: string;
            deviceName: string;
            deviceType: string;
        };
        response: {
            ForcePasswordReset: boolean;
            Kdf: number;
            KdfIterations: number;
            KdfMemory: unknown;
            KdfParallelism: unknown;
            Key: string;
            MasterPasswordPolicy: unknown;
            PrivateKey: string;
            ResetMasterPassword: boolean;
            UserDecryptionOptions: unknown;
            access_token: string;
            expires_in: number;
            refresh_token: string;
            scope: string;
            token_type: string;
        };
    };
    "/api/sync": {
        response: {
            ciphers: Cipher[];
            collections: Collection[];
            domains: unknown;
            folders: Folder[];
            object: string;
            policies: unknown[];
            profile: Profile;
            sends: unknown[];
        };
    };
}

interface Cipher {
    attachments: unknown;
    card: unknown;
    collectionIds: string[];
    creationDate: string;
    data: unknown;
    deletedDate: string | null;
    edit: boolean;
    favorite: boolean;
    fields: {
        linkedId: string | null;
        name: string;
        type: number;
        value: string;
    }[];
    folderId: string | null;
    id: string;
    identify: unknown;
    key: unknown;
    login: {
        autofillOnPageLoad: boolean | null;
        password: string | null;
        passwordRevisionDate: string | null;
        totp: string | null;
        uri: string | null;
        uris: string[];
        username: string | null;
    };
    name: string;
    notes: string | null;
    object: string;
    organizationId: string | null;
    organizationUseTotp: boolean;
    passwordHistory: unknown[];
    reprompt: number;
    revisionDate: string;
    secureNote: unknown;
    type: number;
    viewPassword: boolean;
}

interface Collection {
    externalId: string | null;
    hidePasswords: boolean;
    id: string;
    name: string;
    object: string;
    organizationId: string | null;
    readOnly: boolean;
}

interface Folder {
    id: string;
    name: string;
    object: string;
    revisionDate: string;
}

interface Profile {
    _status: number;
    avatarColor: string | null;
    culture: string;
    email: string;
    emailVerified: boolean;
    forcePasswordReset: boolean;
    id: string;
    key: string;
    masterPasswordHint: string | null;
    name: string;
    object: string;
    organizations: Organization[];
    premium: boolean;
    premiumFromOrganization: boolean;
    privateKey: string;
    providerOrganizations: unknown[];
    providers: unknown[];
    securityStamp: string;
    twoFactorEnabled: boolean;
    usesKeyConnector: boolean;
}

interface Organization {
    accessSecretsManager: boolean;
    allowAdminAccessToAllCollectionItems: boolean;
    enabled: boolean;
    familySponsorshipAvailable: boolean;
    familySponsorshipFriendlyName: string | null;
    familySponsorshipLastSyncDate: string | null;
    familySponsorshipToDelete: unknown;
    familySponsorshipValidUntil_: string | null;
    flexibleCollections: boolean;
    hasPublicAndPrivateKeys: boolean;
    id: string;
    identifier: unknown;
    key: string;
    keyConnectorEnabled: boolean;
    keyConnectorUrl: string | null;
    limitCollectionCreationDeletion: boolean;
    maxAutoscaleSeats: unknown;
    maxCollections: number | null;
    maxStorageGb: number;
    name: string;
    object: string;
    organizationUserId: string;
    permissions: unknown;
    planProductType: number;
    planTierType: number;
    providerId: string | null;
    providerName: string | null;
    providerType: string | null;
    resetPasswordEnrolled: boolean;
    seats: number | null;
    selfHost: boolean;
    ssoBound: boolean;
    status: number;
    type: number;
    use2fa: boolean;
    useActivateAutofillPolicy: boolean;
    useApi: boolean;
    useCustomPermissions: boolean;
    useDirectory: boolean;
    useEvents: boolean;
    useGroup: boolean;
    useKeyConnector: boolean;
    usePasswordManager: boolean;
    usePolicies: boolean;
    useResetPassword: boolean;
    userId: string;
    userGetPremium: boolean;
    useScim: boolean;
    useSecretsManager: boolean;
    useSso: boolean;
    useTotp: boolean;
}

export type GetRoutes = keyof {
    [Path in keyof BitwardenApi as "data" extends keyof BitwardenApi[Path]
        ? never
        : Path]: BitwardenApi[Path];
};

export type PostRoutes = keyof {
    [Path in keyof BitwardenApi as "data" extends keyof BitwardenApi[Path]
        ? Path
        : never]: BitwardenApi[Path];
};
