import { resolve } from "node:path";
import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

function correctDirInNonProduction(s: string): string {
    return (svelteEnv.NODE_ENV || "development") === "development" ? `../../../../${s}` : s;
}

export const env = createEnv({
    server: {
        CMS_URL: z.url(),
        CMS_TOKEN: z.string(),
        STORE_DIR: z
            .string()
            .transform(correctDirInNonProduction)
            .transform(s => resolve(s)),
        LIBS_DIR: z
            .string()
            .transform(correctDirInNonProduction)
            .transform(s => resolve(s)),
        LIBS: z.string(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: svelteEnv,
});
