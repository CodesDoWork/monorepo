export function formatValue(val: unknown, precision: number = 2): string {
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

export function getValueByPath(obj: any, path: string) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function getFlattenedKeys(obj: any, prefix = ""): string[] {
    let keys: string[] = [];
    for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
            keys = keys.concat(getFlattenedKeys(obj[key], `${prefix + key}.`));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
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
