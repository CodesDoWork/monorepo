import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        LIBS_DIR: z.string(),
        LIBS: z.string(),
        STORE_DIR: z.string(),
    },
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: process.env,
});
