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
    const { siteInfo, routes, serverRoutes } = flattenTranslations(data);
    const currentRoute = routes.find(r => r.route === url.pathname);

    return {
        siteInfo: joinKeywords(siteInfo),
        routes,
        currentRoute,
        currentLanguage,
        serverRoutes,
        languages,
    };
}

function joinKeywords(siteInfo: FlatTrans<GetHomeLayoutServerDataQuery>["siteInfo"]) {
    const { keywords, ...rest } = siteInfo;
    return { ...rest, keywords: Object.values(keywords).join(" ") };
}
