import { z } from "zod";

const zEnv = z.object({
    PUBLIC_URL: z.url(),
});
export type Env = z.infer<typeof zEnv>;

export function getEnv(env: unknown): Env {
    return zEnv.parse(env);
}
