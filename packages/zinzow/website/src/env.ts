import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DOMAIN: z.string(),
        URL: z.url(),
        CMS_TOKEN: z.string(),
        CMS_URL: z.url(),
        APOLLO_FETCH_POLICY: z
            .enum([
                "cache-first",
                "cache-and-network",
                "network-only",
                "cache-only",
                "no-cache",
                "standby",
            ])
            .optional(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: svelteEnv,
});
