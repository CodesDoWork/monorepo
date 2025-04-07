import type { Cookies } from "@sveltejs/kit";
import type { LanguageFragment } from "../graphql/default/generated/gql";
import { error } from "@sveltejs/kit";

const LANGUAGE_COOKIE = "lang";

export async function getLanguage(
    request: Request,
    cookies: Cookies,
    languages: LanguageFragment[],
): Promise<LanguageFragment> {
    let languageCode = cookies.get(LANGUAGE_COOKIE);
    let language: LanguageFragment;
    if (languageCode) {
        language = getLanguageFragment(languages, languageCode);
    } else {
        languageCode = getLanguageCodeFromRequest(request);
        language = getLanguageFragment(languages, languageCode);
        setLanguageCookie(cookies, language.code);
    }

    return language;
}

export function setLanguageCookie(cookies: Cookies, languageCode: string) {
    cookies.set(LANGUAGE_COOKIE, languageCode, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
    });
}

function getLanguageCodeFromRequest(request: Request): string | undefined {
    const languageHeader = request.headers.get("accept-language");
    return languageHeader ? languageHeader.split(",")[0].trim() : undefined;
}

function getLanguageFragment(languages: LanguageFragment[], code?: string): LanguageFragment {
    const fallbackLanguage = languages.find(lang => lang.isFallback);
    if (!fallbackLanguage) {
        error(500, "No fallback language found!");
    }

    return code
        ? (languages.find(lang => [lang.code, lang.short].includes(code)) ?? fallbackLanguage)
        : fallbackLanguage;
}
