import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { setApiKey } from "./setApiKey";
import { getStage, stageType } from "./getStage";
import { selectDB } from "./selectDB";
import { databaseType } from "../../../../types/types";
import { getDatabase, getDatabases } from "./notionDB";

const t = initTRPC.create();

const appRouter = t.router({
    getStage: t.procedure
        .input(z.object({}))
        .output(z.object({ stage: stageType }))
        .query(() => getStage().then(stage => ({ stage }))),

    setApiKey: t.procedure
        .input(z.object({ key: z.string().min(1) }))
        .output(z.object({ isValidKey: z.boolean() }))
        .query(({ input }) => setApiKey(input.key).then(isValidKey => ({ isValidKey }))),

    getDBs: t.procedure
        .input(z.object({}))
        .output(z.object({ databases: z.array(databaseType) }))
        .query(() => getDatabases().then(databases => ({ databases }))),

    getDB: t.procedure.input(z.object({})).query(getDatabase),

    selectDB: t.procedure
        .input(z.object({ db: z.string().min(1) }))
        .output(z.object({}))
        .query(({ input }) => selectDB(input.db).then(() => ({}))),
});
export type AppRouter = typeof appRouter;

const handler = (request: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });
export { handler as GET, handler as POST };
