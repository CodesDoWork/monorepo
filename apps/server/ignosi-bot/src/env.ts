import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        PORT: z.coerce.number().default(3000),
        BASE_PATH: z.string().default("/"),
        BASE_URL: z.string().default("http://localhost:3000"),
    },
    runtimeEnv: process.env,
});
