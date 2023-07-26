import { z } from "zod";

export enum Stage {
    Login = "login",
    DbSelection = "db-selection",
    Scoreboard = "scoreboard",
}

export const databaseType = z.object({
    id: z.string(),
    title: z.string(),
});

export type Database = z.infer<typeof databaseType>;
