import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        URL: z.string().url(),
        CMS_URL: z.string().url(),
        CMS_TOKEN: z.string(),
        SMTP_HOST: z.string(),
        SMTP_PORT: z.coerce.number(),
        SMTP_USERNAME: z.string(),
        SMTP_PASSWORD: z.string(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: svelteEnv,
});
