export interface IdObject<T = string> {
    id: T;
}

export function byId<T>(idToFind: T) {
    return function (idObjectEntry: IdObject<T>) {
        return idObjectEntry.id === idToFind;
    };
}

export function oneOf<T>(itemsToFind: T[]) {
    return function (entry: T) {
        return itemsToFind.includes(entry);
    };
}

export function by<T, IdField extends keyof T, Id = T[IdField]>(field: IdField, idToFind: Id) {
    return function (idObjectEntry: T) {
        return idObjectEntry[field] === idToFind;
    };
}
