export function getErrorKey(status: number, key: string): string {
    return getTranslationKey(`errors.${status}`, key);
}

export function getTranslationKey(scope: string, key: string) {
    return `${scope}.${key}`;
}
