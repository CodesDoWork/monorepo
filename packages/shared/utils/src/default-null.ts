type DefaultNull<T extends Record<string, unknown>> = {
    [K in keyof Required<T>]: undefined extends T[K] ? Exclude<T[K], undefined> | null : T[K];
};

export function defaultNull<T extends Record<string, unknown>>(obj: T): DefaultNull<T> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value ?? null]),
    ) as DefaultNull<T>;
}
