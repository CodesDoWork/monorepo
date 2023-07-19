import { z, ZodType } from "zod";
import { getNextFreePort } from "./port";

export const enrichFastifyEnvs = async <TOptions extends Record<string, ZodType>>(
    options: TOptions,
) => {
    const randomPort = await getNextFreePort();

    return {
        HOST: z.string().optional(),
        PORT: z.coerce.number().optional().default(randomPort),
        BASE: z.string().optional(),
        BASE_URL: z.string().optional().default(`http://localhost:${randomPort}`),
        VERSION: z.string().optional().default("development"),
        ...options,
    };
};
