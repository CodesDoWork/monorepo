import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Graph } from "schema-dts";
import type {
    GetHomeLayoutServerDataQuery,
    LanguageFragment,
} from "../graphql/default/generated/gql";
import type { LayoutServerLoad } from "./$types";
import type { Route } from "./types";
import { byId } from "@cdw/monorepo/shared-utils/filters";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { env } from "../env";
import {
    GetHomeLayoutServerData,
    GetHomeLayoutServerLanguages,
} from "../graphql/default/generated/gql";
import { byLanguage, getLanguage } from "../shared/language";
import { mapSocial } from "../shared/mapSocials";
import { getRoute, getRouteByServerRoute, transformRoutes } from "../shared/routes";
import { domainUrl } from "../shared/urls";

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
    const { siteInfo, routes, serverRoutes, about, contact } = flattenTranslations(data);

    const allRoutes = transformRoutes(data.allRoutes);
    const currentRouteId = getRoute(allRoutes, url.pathname)?.id;
    const currentRoute = routes.find(byId(currentRouteId));
    const homeRoute = getRouteByServerRoute(routes, serverRoutes, "/");
    const privacyPolicyRoute = getRouteByServerRoute(routes, serverRoutes, "/privacy-policy");
    routes.forEach(r => {
        const transformedRoute = allRoutes.find(byId(r.id));
        r.route = transformedRoute.translations.find(byLanguage(currentLanguage)).route;
    });

    const socials = contact.socials.map(s => s.socialsId).map(mapSocial);

    const layoutJsonLd = createLayoutJsonLd({
        siteInfo,
        currentLanguage,
        currentRoute,
        about,
        socials,
        homeRoute,
    });

    return {
        siteInfo,
        about,
        routes,
        currentRoute,
        homeRoute,
        privacyPolicyRoute,
        currentLanguage,
        serverRoutes,
        allRoutes,
        languages,
        socials,
        layoutJsonLd,
        baseUrl: env.URL,
    };
}

interface LayoutJsonLdData {
    siteInfo: FlatTrans<GetHomeLayoutServerDataQuery>["siteInfo"];
    currentLanguage: LanguageFragment;
    currentRoute: Route;
    about: FlatTrans<GetHomeLayoutServerDataQuery>["about"];
    socials: ReturnType<typeof mapSocial>[];
    homeRoute: Route;
}

function createLayoutJsonLd(parent: LayoutJsonLdData): Graph {
    const { siteInfo, currentLanguage, about, socials, homeRoute } = parent;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                name: siteInfo.name,
                url: domainUrl(homeRoute),
                sameAs: socials.map(s => s.href),
                image: about.imageUrl,
            },
            {
                "@type": "WebSite",
                name: siteInfo.name,
                url: domainUrl(homeRoute),
                inLanguage: currentLanguage.short,
            },
        ],
    };
}
