import { procedure, router } from "shared/trpc";
import { addTask, getTasks, removeTask } from "./json-db";
import { z } from "zod";

export const schedulerRouter = router({
    getTasks: procedure
        .meta({ openapi: { method: "GET", path: "/getTasks" } })
        .input(z.object({}))
        .output(z.array(z.string()))
        .query(getTasks),
    addTask: procedure
        .meta({ openapi: { method: "GET", path: "/addTask" } })
        .input(z.object({ url: z.string().url() }))
        .output(z.object({}))
        .query(({ input }) => addTask(input.url)),
    removeTask: procedure
        .meta({ openapi: { method: "GET", path: "/removeTask" } })
        .input(z.object({ url: z.string().url() }))
        .output(z.object({}))
        .query(({ input }) => removeTask(input.url)),
});
