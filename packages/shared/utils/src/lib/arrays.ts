import { byId, IdObject } from "./filters";

export function findSafeById<T, O extends IdObject<T>>(collection: O[], id: T): O {
    const item = collection.find(byId(id));
    if (!item) {
        throw new Error(`Item with id ${id} not found`);
    }

    return item;
}
