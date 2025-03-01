import type { BitwardenData, Cipher, Collection, Organization } from "@cdw/monorepo/shared-bitwarden";
import type { Tree } from "@nx/devkit";
import type { BitwardenInfo, RootSecretsConfig, SecretsConfig } from "./types";
import path from "node:path";
import { by, findSafeById } from "@cdw/monorepo/shared-utils";
import { generateFiles, logger } from "@nx/devkit";
import { readConfigFile } from "./config";
import { getCipherSecret, getSecretFieldName, mapToRecord } from "./helpers";
import { BitwardenInfoKey } from "./types";

export class BitwardenEnvGenerator {
    private isPrepared = false;
    private organizationName = "";
    private projectName = "";
    private ciphers: Record<string, Cipher[]> = {};

    constructor(
        private readonly tree: Tree,
        private readonly config: RootSecretsConfig,
        private readonly stages: string[],
    ) {}

    public async prepare(bitwardenData: BitwardenData) {
        const {
            ciphers,
            collections,
            profile: { organizations },
        } = bitwardenData;

        const organization = findSafeById(organizations, this.config.organizationId);
        const rootCollection = findSafeById(collections, this.config.rootCollectionId);

        this.organizationName = organization.name;
        this.projectName = (await rootCollection.name.getValue()).str;

        const filteredCollections = await this.filterCollections(collections, organization);
        await this.setCiphers(ciphers, filteredCollections);

        this.isPrepared = true;
    }

    private async filterCollections(
        collections: Collection[],
        organization: Organization,
    ): Promise<Collection[]> {
        const filteredCollections: Collection[] = [];
        const organizationCollections = collections.filter(by("organizationId", organization.id));
        for (const collection of organizationCollections) {
            const collectionName = await collection.name.getValue();
            if (collectionName.str.startsWith(this.projectName)) {
                filteredCollections.push(collection);
            }
        }

        return filteredCollections;
    }

    private async setCiphers(ciphers: Cipher[], collections: Collection[]) {
        for (const collection of collections) {
            const collectionName = await collection.name.getValue();
            this.ciphers[collectionName.str] = ciphers.filter(cipher =>
                cipher.collectionIds.includes(collection.id),
            );
        }
    }

    public async createEnvFile(root: string) {
        if (!this.isPrepared) {
            throw new Error("Bitwarden data is not prepared");
        }

        const collection = this.getCollection(root);
        logger.info(`Generating env file for ${collection}`);
        const content = await this.getEnvContent(root, collection);
        const fileOptions = { content };
        generateFiles(this.tree, path.join(__dirname, "files"), root, fileOptions);
    }

    private getCollection(root: string): string {
        const dirPath = path.relative(this.tree.root, root);
        if (dirPath) {
            const pathParts = dirPath.split(path.sep);
            pathParts.shift(); // remove "packages"
            return [this.projectName, ...pathParts].join("/");
        }

        return this.projectName;
    }

    private async getEnvContent(root: string, collection: string): Promise<string> {
        const config = readConfigFile(this.tree, root);
        const bitwardenInfos = config.bitwardenInfos.map(info => this.bitwardenInfoToEnv(info));
        const envs = Object.entries(config.env).map(([key, value]) => `${key}=${value}`);
        const secrets = await this.secretConfigToEnv(config.secrets, root, collection);

        const extendedEnvs: string[] = [];
        if (config.extends) {
            const parsedPath = path.parse(path.join(root, config.extends));
            const extendsEnv = await this.getEnvContent(
                parsedPath.dir,
                this.getCollection(parsedPath.dir),
            );
            extendedEnvs.push(...extendsEnv.split("\n"));
        }

        return extendedEnvs.concat(bitwardenInfos).concat(envs).concat(secrets).join("\n");
    }

    private bitwardenInfoToEnv(info: BitwardenInfo, name?: string): string {
        if (typeof info === "string") {
            switch (info) {
                case BitwardenInfoKey.ORGANIZATION_NAME:
                    return `${name || info}=${this.organizationName}`;
                case BitwardenInfoKey.PROJECT_NAME:
                    return `${name || info}=${this.projectName}`;
            }
        } else {
            return this.bitwardenInfoToEnv(info.value, info.name);
        }
    }

    private async secretConfigToEnv(
        secretConfig: SecretsConfig,
        root: string,
        currentCollection: string,
    ): Promise<string[]> {
        const envs: string[] = [];
        for (const [collectionKey, collectionConfig] of Object.entries(secretConfig)) {
            const prefix = collectionConfig.prefix
                ? `${collectionKey
                    .replaceAll("../", "")
                    .replaceAll("/", "_")
                    .replaceAll("-", "_")
                    .toUpperCase()}_`
                : "";

            const collection = this.getCollectionName(currentCollection, collectionKey);
            const ciphers = await this.getCiphers(collection);
            for (const secretConfig of collectionConfig.vars) {
                const field = getSecretFieldName(secretConfig);
                const secretValue = await this.getSecret(ciphers, field);
                if (secretValue) {
                    if (typeof secretConfig === "string") {
                        envs.push(`${prefix}${secretConfig}=${secretValue}`);
                    } else if (secretConfig.file) {
                        this.tree.write(
                            path.join(root, secretConfig.file),
                            secretValue.replace(/\\n/g, "\n"),
                        );
                    } else {
                        envs.push(`${prefix}${secretConfig.name}=${secretValue}`);
                    }
                } else {
                    logger.warn(
                        `No secret found for field '${field}' in collection '${collection}' with stages ${this.stages}`,
                    );
                }
            }
        }

        return envs;
    }

    private async getCiphers(collection: string): Promise<Record<string, Cipher>> {
        const ciphers = this.ciphers[collection];
        if (!ciphers || !ciphers.length) {
            throw new Error(`No ciphers found for collection '${collection}'`);
        }

        return mapToRecord(ciphers, "name");
    }

    private getCollectionName(currentCollection: string, collectionKey: string): string {
        const collection = path
            .normalize(path.join(currentCollection, collectionKey.replace(/\/?index$/, "")))
            .replaceAll(path.sep, "/");

        if (!Object.keys(this.ciphers).includes(collection)) {
            throw new Error(
                `No collection '${collectionKey}' found in '${currentCollection}'. (Resolved to collection '${collection}')`,
            );
        }

        return collection;
    }

    private async getSecret(
        ciphers: Record<string, Cipher>,
        field: string,
    ): Promise<string | undefined> {
        for (const stage of this.stages) {
            const cipher = ciphers[stage];
            if (cipher) {
                const secretValue = await getCipherSecret(cipher, field);
                if (secretValue) {
                    return secretValue;
                }
            }
        }

        return undefined;
    }
}
