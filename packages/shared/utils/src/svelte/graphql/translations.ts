interface ObjectWithTranslations {
    translations?: (object | null)[] | null;
}

type TransOf<T extends ObjectWithTranslations> =
    T["translations"] extends Array<infer E> ? E : never;

type NextLevel<L extends number> = L extends 1
    ? 2
    : L extends 2
      ? 3
      : L extends 3
        ? 4
        : L extends 4
          ? 5
          : never;

export type FlatTrans<T, L extends number = 1> = L extends 5
    ? T
    : T extends Array<infer E>
      ? FlatTrans<E, NextLevel<L>>[]
      : T extends ObjectWithTranslations
        ? FlatTrans<Omit<T, "translations">, NextLevel<L>> & TransOf<T>
        : {
              [K in keyof T]: FlatTrans<T[K]>;
          };

export function flattenTranslations<T>(input: T): FlatTrans<T> {
    return transformTranslations(input) as FlatTrans<T>;
}

function transformTranslations(input: unknown): unknown {
    if (!input || typeof input !== "object") {
        return input;
    }

    if (Array.isArray(input)) {
        return input.map(transformTranslations);
    }

    if ("translations" in input) {
        const { translations, ...rest } = input;
        if (isTranslations(translations)) {
            input = { ...rest, ...translations[0] };
        }
    }

    return Object.entries(input as object).reduce(
        (all, [key, value]) => ({
            ...all,
            [key]: transformTranslations(value),
        }),
        {},
    );
}

function isTranslations(translations: unknown): translations is object[] {
    return (
        Array.isArray(translations) &&
        translations.length &&
        translations[0] &&
        typeof translations[0] === "object"
    );
}
