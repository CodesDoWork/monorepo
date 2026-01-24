import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        CMS_URL: z.url(),
        CMS_TOKEN: z.string(),
        DEV_USER_EMAIL: z.email().optional(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: svelteEnv,
});
