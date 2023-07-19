import { createEnv } from "@t3-oss/env-core";
import { z, ZodAny } from "zod";
import { getNextFreePort } from "./port";

export const createFastifyEnv = async <TOptions extends Record<string, ZodAny>>(
    options?: TOptions,
) => {
    const randomPort = await getNextFreePort();

    return createEnv({
        server: {
            HOST: z.string().optional(),
            PORT: z.coerce.number().optional().default(randomPort),
            BASE: z.string().optional(),
            BASE_URL: z.string().optional().default(`http://localhost:${randomPort}`),
            VERSION: z.string().optional().default("development"),
            ...(options ?? {}),
        },
        runtimeEnv: process.env,
    });
};
