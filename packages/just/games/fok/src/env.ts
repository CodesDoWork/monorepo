import { env as svelteEnv } from "$env/dynamic/private";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
    server: {},
    clientPrefix: "PUBLIC_",
    client: {},
    runtimeEnv: svelteEnv,
});
