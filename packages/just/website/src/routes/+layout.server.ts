import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type {
    GetHomeLayoutServerDataQuery,
    LanguageFragment,
} from "../graphql/default/generated/gql";
import type { LayoutServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import {
    GetHomeLayoutServerData,
    GetHomeLayoutServerLanguages,
} from "../graphql/default/generated/gql";
import { getLanguage } from "../shared/language";
import { pathOrEmpty } from "../shared/routes";

export const load: LayoutServerLoad = async ({ request, url, cookies }) => {
    const { languages } = await toPromise(GetHomeLayoutServerLanguages({}));
    const language = await getLanguage(request, cookies, languages);
    return loadServerData(url, language, languages);
};

async function loadServerData(
    url: URL,
    currentLanguage: LanguageFragment,
    languages: LanguageFragment[],
) {
    const data = await toPromise(
        GetHomeLayoutServerData({ variables: { language: currentLanguage.code } }),
    );
    const { siteInfo, routes, serverRoutes, fallbackLanguage } = flattenTranslations(data);
    transformRoutes(routes, currentLanguage, fallbackLanguage[0].code);
    const currentRoute = routes.find(r => r.route === url.pathname);
    const privacyPolicyRoute = routes.find(
        r => r.id === serverRoutes.find(sr => sr.route === "/privacy-policy")?.id,
    );

    return {
        siteInfo: joinKeywords(siteInfo),
        routes,
        currentRoute,
        privacyPolicyRoute,
        currentLanguage,
        serverRoutes,
        languages,
    };
}

function transformRoutes(
    routes: FlatTrans<GetHomeLayoutServerDataQuery>["routes"],
    language: LanguageFragment,
    fallbackLanguage: string,
) {
    if (language.code === fallbackLanguage) {
        return;
    }

    routes.forEach(r => {
        r.route = `/${language.short}${pathOrEmpty(r.route)}`;
    });
}

function joinKeywords(siteInfo: FlatTrans<GetHomeLayoutServerDataQuery>["siteInfo"]) {
    const { keywords, ...rest } = siteInfo;
    return { ...rest, keywords: Object.values(keywords).join(" ") };
}
