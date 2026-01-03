import { z } from "zod";

export interface SSHOptions {
    sshOptions: string[];
    login: string;
    dest: string;
}

const zMigrations = z.object({
    version: z.string(),
    preCommands: z.array(z.string()).optional(),
    postCommands: z.array(z.string()).optional(),
});

export type Migrations = z.infer<typeof zMigrations>;

export const zMigrationsConfig = z.object({
    migrations: z.array(zMigrations),
});

export type MigrationsConfig = z.infer<typeof zMigrationsConfig>;
