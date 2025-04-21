import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";
import { configDotenv } from "dotenv";

configDotenv();

const schemaOptions: Types.UrlSchemaOptions = {
    headers: { Authorization: `Bearer ${process.env.CMS_TOKEN}` },
};
const defaultUri = `${process.env.CMS_URL}/graphql`;
const clientSchema: Types.Schema = { [defaultUri]: schemaOptions };
const systemSchema: Types.Schema = { [`${defaultUri}/system`]: schemaOptions };

const gqlPlugins: string[] = [
    "typescript",
    "typescript-operations",
    "graphql-codegen-svelte-apollo",
];
const introspectionPlugins: string[] = ["introspection"];

const gqlConfig = {
    clientPath: "../client",
};

export const config: CodegenConfig = {
    overwrite: true,
    ignoreNoDocuments: true,
    generates: {
        // default
        "./src/graphql/default/generated/gql.ts": {
            schema: clientSchema,
            documents: "./src/**/*.default.graphql",
            plugins: gqlPlugins,
            config: gqlConfig,
        },
        "./src/graphql/default/generated/graphql.schema.json": {
            schema: clientSchema,
            plugins: introspectionPlugins,
        },
        // system
        "./src/graphql/system/generated/gql.ts": {
            schema: systemSchema,
            documents: "./src/**/*.system.graphql",
            plugins: gqlPlugins,
            config: gqlConfig,
        },
        "./src/graphql/system/generated/graphql.schema.json": {
            schema: systemSchema,
            plugins: introspectionPlugins,
        },
    },
};
export default config;
