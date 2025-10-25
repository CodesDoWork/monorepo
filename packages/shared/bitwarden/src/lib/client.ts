import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type { BitwardenApi, GetRoutes, PostRoutes } from "./bitwarden-api";
import type { ByteData } from "./crypto";
import type { BitwardenData, Cipher, Collection, Organization } from "./data";
import axios, { Axios } from "axios";
import {
    aesEncryptionTypes,
    decryptAes,
    decryptRsa,
    EncryptionType,
    pbkdf2,
    RsaKey,
    Secret,
    stretchKey,
    SymmetricKey,
} from "./crypto";

export class BitwardenClient {
    private readonly api: Axios;
    private readonly keys: UserKeys = { privateRsaKey: null, symmetricKeys: new Map() };

    constructor(
        serverUrl: string,
        private readonly email: string,
        private readonly masterPassword: string,
    ) {
        this.api = new Axios({
            ...axios.defaults,
            headers: undefined,
            baseURL: serverUrl,
        });
        this.api.defaults.headers = axios.defaults.headers;
    }

    public async login() {
        const { kdfIterations: iterations } = await this.post("/identity/accounts/prelogin", {
            email: this.email,
        });

        const masterKey = this.computeMasterKey(iterations);
        const masterHash = this.computeMasterHash(masterKey);
        const stretchedMasterKey = await this.strechMasterKey(masterKey);

        const {
            Key: userKeyDisplay,
            PrivateKey: privateRsaKeyDisplay,
            access_token: accessToken,
        } = await this.sendLoginRequest(masterHash);
        this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const userKeySecret = new Secret(this, userKeyDisplay);
        const userKey = await decryptAes(userKeySecret, stretchedMasterKey);
        this.keys.symmetricKeys.set(null, new SymmetricKey(userKey.buf));

        const privateRsaKeySecret = new Secret(this, privateRsaKeyDisplay);
        const privateRsaKeyData = await this.decrypt(privateRsaKeySecret);
        this.keys.privateRsaKey = new RsaKey(privateRsaKeyData.buf);
    }

    public async sync(): Promise<BitwardenData> {
        const { ciphers, collections, profile } = await this.get("/api/sync");
        for (const organization of profile.organizations) {
            const organizationKey = await this.decrypt(new Secret(this, organization.key));
            this.keys.symmetricKeys.set(organization.id, new SymmetricKey(organizationKey.buf));
        }

        return {
            ciphers: ciphers
                .filter(cipher => cipher.deletedDate === null)
                .map(
                    cipher =>
                        ({
                            collectionIds: cipher.collectionIds,
                            fields: cipher.fields.map(field => ({
                                name: new Secret(this, field.name, cipher.organizationId),
                                value: new Secret(this, field.value, cipher.organizationId),
                            })),
                            id: cipher.id,
                            login: {
                                username: cipher.login?.username
                                    ? new Secret(this, cipher.login.username, cipher.organizationId)
                                    : null,
                                password: cipher.login?.password
                                    ? new Secret(this, cipher.login.password, cipher.organizationId)
                                    : null,
                            },
                            name: new Secret(this, cipher.name, cipher.organizationId),
                            organizationId: cipher.organizationId,
                        }) satisfies Cipher,
                ),
            collections: collections.map(
                collection =>
                    ({
                        id: collection.id,
                        name: new Secret(this, collection.name, collection.organizationId),
                        organizationId: collection.organizationId,
                    }) satisfies Collection,
            ),
            profile: {
                organizations: profile.organizations.map(
                    organization =>
                        ({
                            id: organization.id,
                            name: organization.name,
                        }) satisfies Organization,
                ),
            },
        };
    }

    public async decrypt(secret: Secret): Promise<ByteData> {
        const key = aesEncryptionTypes.includes(secret.encType)
            ? this.keys.symmetricKeys.get(secret.organizationId)
            : this.keys.privateRsaKey;
        if (!key) {
            throw new Error("Key not found");
        }

        switch (secret.encType) {
            case EncryptionType.AesCbc256_HmacSha256:
                return decryptAes(secret, key as SymmetricKey);
            case EncryptionType.Rsa2048_OaepSha1:
                return decryptRsa(secret, key as RsaKey);
            default:
                throw new Error("Unsupported encryption type.");
        }
    }

    private sendLoginRequest(masterHash: ByteData) {
        const device = "codedowork-shared-bitwarden-client";
        return this.post(
            "/identity/connect/token",
            {
                grant_type: "password",
                username: this.email,
                password: masterHash.b64,
                scope: "api offline_access",
                client_id: "web",
                deviceIdentifier: device,
                deviceName: device,
                deviceType: device,
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        );
    }

    private computeMasterKey(iterations: number): ByteData {
        return pbkdf2(this.masterPassword, this.email, iterations);
    }

    private computeMasterHash(masterKey: ByteData): ByteData {
        return pbkdf2(masterKey.buf, this.masterPassword, 1);
    }

    private strechMasterKey(masterKey: ByteData): Promise<SymmetricKey> {
        return stretchKey(new Uint8Array(masterKey.buf));
    }

    private get<Path extends GetRoutes, R = BitwardenApi[Path]["response"]>(
        url: Path,
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.api
            .get<R>(url, config)
            .then(this.resultOf)
            .catch(this.logErr<R>);
    }

    private post<Path extends PostRoutes, R = BitwardenApi[Path]["response"]>(
        url: Path,
        data: BitwardenApi[Path]["data"],
        config?: AxiosRequestConfig,
    ): Promise<R> {
        return this.api
            .post<R>(url, data, config)
            .then(this.resultOf)
            .catch(this.logErr<R>);
    }

    private resultOf<R>(res: AxiosResponse<R>): R {
        return res.data;
    }

    private logErr<R>(err: AxiosError): R {
        console.error(err);
        throw err;
    }
}

interface UserKeys {
    privateRsaKey: RsaKey | null;
    symmetricKeys: Map<string | null, SymmetricKey>;
}
