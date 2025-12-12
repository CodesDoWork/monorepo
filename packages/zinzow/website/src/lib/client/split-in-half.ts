export function splitInHalf<T>(array: T[]): [T[], T[]] {
    return [array.slice(0, array.length / 2), array.slice(array.length / 2)];
}
