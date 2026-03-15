type PreserveNullable<U, T> =
    | U
    | (T extends null ? null : never)
    | (T extends undefined ? undefined : never);

interface ObjectWithTranslations {
    translations?: (object | null)[] | null;
}

type TransOf<T extends ObjectWithTranslations> =
    NonNullable<T["translations"]> extends Array<infer E>
        ? PreserveNullable<E, T["translations"]>
        : never;

type NextLevels = [1, 2, 3, 4, 5];
type NextLevel<L extends number> = NextLevels[L];
type Last<T extends readonly unknown[]> = T extends [...infer _, infer L] ? L : never;

export type FlatTrans<T, L extends number = 1> =
    L extends Last<NextLevels>
        ? T
        : NonNullable<T> extends Array<infer E>
          ? PreserveNullable<FlatTrans<E, NextLevel<L>>[], T>
          : NonNullable<T> extends ObjectWithTranslations
            ? PreserveNullable<
                  FlatTrans<Omit<NonNullable<T>, "translations">, NextLevel<L>> &
                      TransOf<NonNullable<T>>,
                  T
              >
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

    return tranformTranslationsOnObject(input);
}

function tranformTranslationsOnObject(input: object): object {
    if ("translations" in input) {
        input = transformTranslationsArrayToObject(input);
    }

    return Object.entries(input as object).reduce(
        (all, [key, value]) => ({
            ...all,
            [key]: transformTranslations(value),
        }),
        {},
    );
}

function transformTranslationsArrayToObject(input: { translations: unknown }) {
    const { translations, ...rest } = input;
    return isTranslations(translations) ? { ...rest, ...translations[0] } : input;
}

function isTranslations(translations: unknown): translations is object[] {
    return (
        Array.isArray(translations) &&
        translations.length &&
        translations[0] &&
        typeof translations[0] === "object"
    );
}
