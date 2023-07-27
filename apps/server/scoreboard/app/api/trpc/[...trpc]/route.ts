import { z } from "zod";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { setApiKey } from "./setApiKey";
import { getStage, stageType } from "./getStage";
import { selectDB } from "./selectDB";
import { databaseType } from "../../../../types/types";
import { getDatabases } from "./notion/getDatabases";
import { getDatabase } from "./notion/getDatabase";
import { updateProperty } from "./notion/updateProperty";
import { createAppRouter, procedure, router } from "shared/trpc";

const apiRouter = router({
    getStage: procedure
        .input(z.object({}))
        .output(z.object({ stage: stageType }))
        .query(() => getStage().then(stage => ({ stage }))),

    setApiKey: procedure
        .input(z.object({ key: z.string().min(1) }))
        .output(z.object({ isValidKey: z.boolean() }))
        .query(({ input }) => setApiKey(input.key).then(isValidKey => ({ isValidKey }))),

    getDBs: procedure
        .input(z.object({}))
        .output(z.object({ databases: z.array(databaseType) }))
        .query(() => getDatabases().then(databases => ({ databases }))),

    getDB: procedure.input(z.object({})).query(getDatabase),

    selectDB: procedure
        .input(z.object({ db: z.string().min(1) }))
        .output(z.object({}))
        .query(({ input }) => selectDB(input.db).then(() => ({}))),

    updateProperty: procedure
        .input(z.object({ propName: z.string().min(1), add: z.number() }))
        .output(z.object({ value: z.number() }))
        .query(({ input }) => updateProperty(input.propName, input.add).then(value => ({ value }))),
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
