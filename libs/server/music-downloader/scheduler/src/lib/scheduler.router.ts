import { procedure, router } from "shared/trpc";
import { addTask, getTasks, removeTask } from "./json-db";
import { z } from "zod";

export const schedulerRouter = router({
    getTasks: procedure.query(getTasks),
    addTask: procedure.input(z.string().url()).query(({ input }) => addTask(input)),
    removeTask: procedure.input(z.string().url()).query(({ input }) => removeTask(input)),
});
