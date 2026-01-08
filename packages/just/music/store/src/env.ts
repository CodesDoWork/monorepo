import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        MUSIC_LIB_DIRS: z.string(),
        MUSIC_STORE_DIR: z.string(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: process.env,
});
