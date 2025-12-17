import type { IdObject } from "./filters";
import { byId } from "./filters";

export function findSafeById<T, O extends IdObject<T>>(collection: O[], id: T): O {
    const item = collection.find(byId(id));
    if (!item) {
        throw new Error(`Item with id ${id} not found`);
    }

    return item;
}

export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]] as [T, T];
    }

    return array;
}
