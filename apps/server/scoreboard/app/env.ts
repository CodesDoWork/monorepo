import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_CLIENT_ID: z.string(),
        AUTH_CLIENT_SECRET: z.string(),
        AUTHENTIK_ISSUER: z.string(),
    },
    runtimeEnv: process.env,
});
