import type { Cookies } from "@sveltejs/kit";
import type { LanguageFragment } from "../graphql/default/generated/gql";
import type { TransformedRoute } from "./routes";
import { error } from "@sveltejs/kit";
import { env } from "../env";

const LANGUAGE_COOKIE = "lang";

export async function getLanguage(
    request: Request,
    cookies: Cookies,
    languages: LanguageFragment[],
    routes: TransformedRoute[],
): Promise<LanguageFragment> {
    let languageCode = cookies.get(LANGUAGE_COOKIE);
    let language: LanguageFragment;
    if (languageCode) {
        language = getLanguageFragment(languages, languageCode);
    } else {
        languageCode =
            getLanguageCodeFromRequest(request) || getLanguageCodeFromUrl(request, routes);
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
        secure: env.NODE_ENV === "production",
    });
}

function getLanguageCodeFromRequest(request: Request): string | undefined {
    const languageHeader = request.headers.get("accept-language");
    return languageHeader ? languageHeader.split(",")[0].trim() : undefined;
}

function getLanguageCodeFromUrl(request: Request, routes: TransformedRoute[]): string | undefined {
    const path = new URL(request.url).pathname;
    return (
        routes.flatMap(r => r.translations).find(t => t.route === path)?.language.short ||
        path.split("/")[1]
    );
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

interface Translation {
    language?: LanguageFragment | null;
}

export function byLanguage(language: LanguageFragment) {
    return function (translation: Translation) {
        return translation.language?.code === language.code;
    };
}
