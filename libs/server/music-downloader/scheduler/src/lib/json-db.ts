import { readFile, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const dataDir = ".data";
const dbFile = join(dataDir, "tasks.json");

if (!existsSync(dbFile)) {
    if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
    }

    writeFileSync(dbFile, "[]");
}

export const getTasks = (): Promise<string[]> =>
    new Promise((resolve, reject) =>
        readFile(dbFile, (err, data) => (err ? reject(err) : resolve(JSON.parse(data.toString())))),
    );

export const addTask = (task: string): Promise<void> =>
    getTasks().then(tasks => writeTasks([...tasks, task]));

export const removeTask = (task: string): Promise<void> =>
    getTasks().then(tasks => writeTasks(tasks.filter(t => t !== task)));

const writeTasks = (tasks: string[]) => writeFileSync(dbFile, JSON.stringify(tasks));
