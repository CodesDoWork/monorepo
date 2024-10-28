import { createAppRouter, procedure, router } from "@codesdowork/shared-trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import { download } from "./download";

const apiRouter = router({
    download: procedure
        .meta({ openapi: { method: "GET", path: "/download" } })
        .input(z.object({ url: z.string().url() }))
        .output(z.object({}))
        .query(({ input }) => {
            download(input.url).then();
            return {};
        }),
});

const appRouter = createAppRouter(apiRouter);
export type AppRouter = typeof appRouter;

const handler = (request: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });
export { handler as GET, handler as POST };
