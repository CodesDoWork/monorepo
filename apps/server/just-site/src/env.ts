import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { env as svelteEnv } from "$env/dynamic/private";

export const env = createEnv({
    server: {
        GHOST_API_KEY: z.string(),
        GITHUB_TOKEN: z.string(),
        CMS_URL: z.string().url(),
        CMS_USER: z.string(),
        CMS_PASSWORD: z.string(),
        SMTP_HOST: z.string(),
        SMTP_PORT: z.coerce.number(),
        SMTP_USER: z.string(),
        SMTP_PASSWORD: z.string(),
    },
    runtimeEnv: svelteEnv,
});
