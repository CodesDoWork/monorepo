import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";
import { configDotenv } from "dotenv";

configDotenv();

const schemaOptions: Types.UrlSchemaOptions = {
    headers: { Authorization: `Bearer ${process.env.CMS_TOKEN}` },
};
const defaultUri = `${process.env.CMS_URL}/graphql`;
const clientSchema: Types.Schema = { [defaultUri]: schemaOptions };

export const config: CodegenConfig = {
    overwrite: true,
    ignoreNoDocuments: true,
    generates: {
        "./src/generated/types.ts": {
            schema: clientSchema,
            plugins: ["typescript"],
            config: {
                avoidOptionals: true,
            },
        },
    },
};
export default config;
