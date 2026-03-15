export function formatValue(val: unknown, precision = 2): string {
    if (typeof val === "bigint") {
        return val.toString();
    }
    if (typeof val === "number") {
        return val.toFixed(precision);
    }
    if (val === undefined || val === null) {
        return "-";
    }

    return String(val);
}

export function getValueByPath<T = unknown>(
    obj: Record<string, unknown>,
    path: string,
): T | undefined {
    return path
        .split(".")
        .reduce<unknown>((acc, part) => (hasKey(acc, part) ? acc[part] : undefined), obj) as
        | T
        | undefined;
}

export function getFlattenedKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    let keys: string[] = [];
    for (const key in obj) {
        const value = obj[key];
        if (isObject(value)) {
            keys = keys.concat(
                getFlattenedKeys(value as Record<string, unknown>, `${prefix}${key}.`),
            );
        } else {
            keys.push(prefix + key);
        }
    }

    return keys;
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

export function hasKey(obj: unknown, key: string): obj is Record<string, unknown> {
    return isObject(obj) && key in obj;
}

export type PathsOf<T> = T extends object
    ? {
          [K in keyof T & (string | number)]: T[K] extends object
              ? `${K}` | `${K}.${PathsOf<T[K]>}`
              : `${K}`;
      }[keyof T & (string | number)]
    : never;

export type DeepNullable<T> = {
    [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : T[K] | null;
};
