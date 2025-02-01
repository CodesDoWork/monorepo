import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DOWNLOAD_DIR: z.string(),
    },
    runtimeEnv: process.env,
});
