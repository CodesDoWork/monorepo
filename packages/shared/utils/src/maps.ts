export function to<T, Field extends keyof T>(field: Field) {
    return function (item: T) {
        return item[field];
    };
}
