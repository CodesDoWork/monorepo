import { z } from "zod";

export enum Stage {
    Loading,
    Login,
    DbSelection,
    Scoreboard,
}

export const databaseType = z.object({
    id: z.string(),
    title: z.string(),
});

export type Database = z.infer<typeof databaseType>;
