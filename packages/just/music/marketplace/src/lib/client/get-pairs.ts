export function getPairs<T>(items: T[]): T[][] {
    return items.reduce((all, _, i) => {
        if (i % 2 === 0) {
            all.push(items.slice(i, i + 2));
        }
        return all;
    }, [] as T[][]);
}
