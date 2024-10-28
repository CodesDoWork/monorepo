import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DOMAIN: z.string(),
    },
    runtimeEnv: svelteEnv,
});
