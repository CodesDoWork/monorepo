import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Graph } from "schema-dts";
import type {
    GetHomeLayoutServerDataQuery,
    LanguageFragment,
} from "../graphql/default/generated/graphql";
import type { TransformedRoute } from "../shared/routes";
import type { LayoutServerLoad } from "./$types";
import type { Route } from "./types";
import { byId } from "@cdw/monorepo/shared-utils/filters";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { env } from "../env";
import { defaultClient } from "../graphql/default/client";
import {
    GetHomeLayoutServerDataDocument,
    GetHomeLayoutServerLanguagesDocument,
} from "../graphql/default/generated/graphql";
import { assetUrl } from "../shared/assets";
import { byLanguage, getLanguage } from "../shared/language";
import { mapSocial } from "../shared/mapSocials";
import { getRoute, getRouteByServerRoute, transformRoutes } from "../shared/routes";
import { domainUrl } from "../shared/urls";

export const load: LayoutServerLoad = async ({ request, url, cookies }) => {
    const { data } = await defaultClient.query({ query: GetHomeLayoutServerLanguagesDocument });
    const allRoutes = transformRoutes(data.allRoutes);
    const language = await getLanguage(request, cookies, data.languages, allRoutes);
    return loadServerData(url, language, data.languages, allRoutes);
};

async function loadServerData(
    url: URL,
    currentLanguage: LanguageFragment,
    languages: LanguageFragment[],
    allRoutes: TransformedRoute[],
) {
    const { data } = await defaultClient.query({
        query: GetHomeLayoutServerDataDocument,
        variables: { language: currentLanguage.code },
    });

    const { siteInfo, routes, serverRoutes, about, contact } = flattenTranslations(data);
    const currentRouteId = getRoute(allRoutes, url.pathname)?.id;
    const currentRoute = routes.find(byId(currentRouteId));
    const homeRoute = getRouteByServerRoute(routes, serverRoutes, "/");
    const privacyPolicyRoute = getRouteByServerRoute(routes, serverRoutes, "/privacy-policy");
    routes.forEach(r => {
        const transformedRoute = allRoutes.find(byId(r.id));
        r.route = transformedRoute.translations.find(byLanguage(currentLanguage)).route;
    });

    const socials = contact.socials.map(s => s.socialsId).map(mapSocial);
    about.portrait = assetUrl(about.portrait, { quality: 67, width: 400, height: 400 });

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
                image: about.portrait,
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
