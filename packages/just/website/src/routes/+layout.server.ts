import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { Graph } from "schema-dts";
import type {
    GetHomeLayoutServerDataQuery,
    LanguageFragment,
} from "../graphql/default/generated/graphql";
import type { TransformedRoute } from "../lib/common/routes";
import type { LayoutServerLoad } from "./$types";
import type { Route } from "./types";
import { assetUrl } from "@cdw/monorepo/shared-directus";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { byId } from "@cdw/monorepo/shared-utils/filters";
import { env } from "../env";
import { queryDefault } from "../graphql/default/client";
import {
    GetHomeLayoutServerDataDocument,
    GetHomeLayoutServerLanguagesDocument,
} from "../graphql/default/generated/graphql";
import { getRouteByServerRoute, transformRoutes } from "../lib/common/routes";
import { byLanguage, getLanguage } from "../lib/server/language";
import { mapSocial } from "../lib/server/map-socials";

export const load: LayoutServerLoad = async ({ request, cookies }) => {
    const data = await queryDefault({ query: GetHomeLayoutServerLanguagesDocument });
    const allRoutes = transformRoutes(data.allRoutes);
    const language = await getLanguage(request, cookies, data.languages, allRoutes);
    return loadServerData(language, data.languages, allRoutes);
};

async function loadServerData(
    currentLanguage: LanguageFragment,
    languages: LanguageFragment[],
    allRoutes: TransformedRoute[],
) {
    const layoutData = await getLayoutData(currentLanguage.code);
    const { siteInfo, routes, serverRoutes } = layoutData;
    const about = getAboutData(layoutData.about);
    const socials = layoutData.contact.socials.map(s => s.socialsId).map(mapSocial);

    const homeRoute = getRouteByServerRoute(routes, serverRoutes, "/");
    const privacyPolicyRoute = getRouteByServerRoute(routes, serverRoutes, "/privacy-policy");
    setRoutesByLanguage(routes, allRoutes, currentLanguage);

    const jsonLdData: LayoutJsonLdData = {
        siteInfo,
        currentLanguage,
        about,
        socials,
        homeRoute,
        baseUrl: env.URL,
    };

    const layoutJsonLd = createLayoutJsonLd(jsonLdData);
    return {
        ...jsonLdData,
        routes,
        privacyPolicyRoute,
        serverRoutes,
        allRoutes,
        languages,
        layoutJsonLd,
    };
}

function getLayoutData(language: string) {
    return queryDefault({
        query: GetHomeLayoutServerDataDocument,
        variables: { language },
    }).then(flattenTranslations);
}

function setRoutesByLanguage(
    routes: Route[],
    allRoutes: TransformedRoute[],
    language: LanguageFragment,
) {
    routes.forEach(r => {
        const transformedRoute = allRoutes.find(byId(r.id));
        r.route = transformedRoute.translations.find(byLanguage(language)).route;
    });
}

function getAboutData(about: GetHomeLayoutServerDataQuery["about"]) {
    return {
        ...about,
        portrait: assetUrl(env.CMS_URL, about.portrait.id, {
            quality: 80,
            width: 512,
            height: 512,
        }),
    };
}

interface LayoutJsonLdData {
    siteInfo: FlatTrans<GetHomeLayoutServerDataQuery>["siteInfo"];
    currentLanguage: LanguageFragment;
    about: Omit<FlatTrans<GetHomeLayoutServerDataQuery>["about"], "portrait"> & {
        portrait: string;
    };
    socials: ReturnType<typeof mapSocial>[];
    homeRoute: Route;
    baseUrl: string;
}

function createLayoutJsonLd(parent: LayoutJsonLdData): Graph {
    const { siteInfo, currentLanguage, about, socials, homeRoute, baseUrl } = parent;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                name: siteInfo.name,
                url: `${baseUrl}${homeRoute.route}`,
                sameAs: socials.map(s => s.href),
                image: about.portrait,
            },
            {
                "@type": "WebSite",
                name: siteInfo.name,
                url: `${baseUrl}${homeRoute.route}`,
                inLanguage: currentLanguage.short,
            },
        ],
    };
}
