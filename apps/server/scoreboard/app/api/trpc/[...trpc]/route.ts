import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Client } from "@notionhq/client";

const t = initTRPC.create();

const appRouter = t.router({
    setApiKey: t.procedure
        .input(z.object({ key: z.string().min(1) }))
        .output(z.object({ ok: z.boolean() }))
        .query(({ input }) => setApiKey(input.key).then(ok => ({ ok }))),
});

export type AppRouter = typeof appRouter;

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });
};

export { handler as GET, handler as POST };

const setApiKey = async (key: string): Promise<boolean> => {
    const notion = new Client({
        auth: key,
    });

    notion.users.me({}).then(console.log);

    return false;
};
