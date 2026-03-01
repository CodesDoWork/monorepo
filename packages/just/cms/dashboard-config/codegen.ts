import { getCodegenConfig } from "@cdw/monorepo/shared-configs/codegen/directus";

export const config = getCodegenConfig(({ clientSchema }) => ({
    generates: {
        "./src/generated/types.ts": {
            schema: clientSchema,
            plugins: ["typescript"],
            config: {
                avoidOptionals: true,
            },
        },
    },
}));

export default config;
