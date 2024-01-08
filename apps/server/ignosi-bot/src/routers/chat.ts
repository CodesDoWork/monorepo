import { procedure, router } from "shared/trpc";
import { z } from "zod";

export const chatRouter = router({
    hello: procedure
        .meta({ openapi: { path: "/hello", method: "GET" } })
        .input(z.object({ name: z.string().default("world") }))
        .output(z.object({ greeting: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}`,
            };
        }),
});
