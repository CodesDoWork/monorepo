import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DOWNLOAD_DIR: z.string(),
    },
    clientPrefix: "NEXT_PUBLIC_",
    client: {
        NEXT_PUBLIC_BASE_PATH: z.string().optional().default(""),
    },
    runtimeEnv: process.env,
});
