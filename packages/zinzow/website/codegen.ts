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

const introspectionPlugins: string[] = ["introspection"];

const presetConfig = {
    fragmentMasking: false,
};

export const config: CodegenConfig = {
    overwrite: true,
    generates: {
        // default
        "./src/graphql/default/generated/": {
            schema: clientSchema,
            documents: "./src/**/*.default.graphql",
            presetConfig,
            preset: "client",
        },
        "./src/graphql/default/generated/graphql.schema.json": {
            schema: clientSchema,
            plugins: introspectionPlugins,
        },
        // system
        "./src/graphql/system/generated/": {
            schema: systemSchema,
            documents: "./src/**/*.system.graphql",
            presetConfig,
            preset: "client",
        },
        "./src/graphql/system/generated/graphql.schema.json": {
            schema: systemSchema,
            plugins: introspectionPlugins,
        },
    },
};
export default config;
