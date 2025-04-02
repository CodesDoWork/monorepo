import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { GetHomeLayoutServerDataQuery } from "../graphql/default/generated/gql";
import type { LayoutServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetHomeLayoutServerData } from "../graphql/default/generated/gql";

const LANGUAGE_COOKIE = "lang";
const FALLBACK_LANGUAGE = "en";

const languageMap: Record<string, string> = {
    de: "de-DE",
    [FALLBACK_LANGUAGE]: "en-US",
};

export const load: LayoutServerLoad = async ({ request, url, cookies }) => {
    let language = cookies.get(LANGUAGE_COOKIE);
    if (!language) {
        language = getLanguageFromHeader(request.headers.get("accept-language"));
        cookies.set(LANGUAGE_COOKIE, language, { path: "/", httpOnly: true, sameSite: "strict" });
    }

    const data = await toPromise(GetHomeLayoutServerData({ variables: { language } }));
    const { siteInfo, routes } = flattenTranslations(data);
    const currentRoute = routes.find(r => r.route === url.pathname);

    return { siteInfo: joinKeywords(siteInfo), routes, currentRoute, language };
};

function getLanguageFromHeader(languageHeader: string | null): string {
    const languageCode = languageHeader ? languageHeader.split(",")[0].trim() : FALLBACK_LANGUAGE;
    const language = new Intl.Locale(languageCode).language;
    return languageMap[language] || languageMap[FALLBACK_LANGUAGE];
}

function joinKeywords(siteInfo: FlatTrans<GetHomeLayoutServerDataQuery>["siteInfo"]) {
    const { keywords, ...rest } = siteInfo;
    return { ...rest, keywords: Object.values(keywords).join(" ") };
}
