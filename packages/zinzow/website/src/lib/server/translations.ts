interface Translation {
    key: string;
    value: string;
}

export const getPageIdPrefix = (pageId: string) => `page.${pageId}.`;

export function getTextsFromTranslations(
    translations: Translation[],
    pageIdPrefix: string,
): Record<string, string> {
    return Object.fromEntries(translations.map(t => [t.key.replace(pageIdPrefix, ""), t.value]));
}
