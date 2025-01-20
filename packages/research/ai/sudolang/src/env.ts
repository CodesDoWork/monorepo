import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const env = createEnv({
    server: {
        OPENAI_API_KEY: z.string(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: process.env,
});
