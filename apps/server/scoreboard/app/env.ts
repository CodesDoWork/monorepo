import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_CLIENT_ID: z.string(),
        AUTH_CLIENT_SECRET: z.string(),
        AUTH_ISSUER: z.string(),
        BASE_PATH: z.string().optional().default(""),
        NEXTAUTH_URL: z.string(),
        NEXTAUTH_SECRET: z.string(),
        PG_USER: z.string(),
        PG_PASSWORD: z.string(),
        PG_HOST: z.string(),
        PG_PORT: z.coerce.number().optional().default(5432),
        DB_NAME: z.string(),
        PORT: z.coerce.number().optional().default(4200),
        SECRET_KEY: z.string(),
    },
    runtimeEnv: process.env,
});
