import type { MinimalTranslatedRouteFragment } from "../graphql/default/generated/gql";
import type { ServerRoute } from "../routes/types";
import { byField, byId } from "@cdw/monorepo/shared-utils/filters";

export function getRoute<T extends MinimalTranslatedRouteFragment>(
    routes: T[],
    path: string,
): T | undefined {
    const allRoutes = routes.flatMap(r => r.translations.map(t => ({ ...t, id: r.id })));
    allRoutes.sort((r1, r2) => r2.route.length - r1.route.length);
    const id = allRoutes.find(byField("route", path))?.id;
    return id ? routes.find(byId(id)) : undefined;
}

export function getRouteByServerRoute<T extends MinimalTranslatedRouteFragment>(
    routes: T[],
    serverRoutes: ServerRoute[],
    route: string,
): T | undefined {
    const routeId = serverRoutes.find(byField("route", route))?.id;
    return routes.find(byId(routeId));
}

export type TransformedRoute = ReturnType<typeof transformRoutes>[number];

export function transformRoutes<T extends MinimalTranslatedRouteFragment>(routes: T[]) {
    return routes.map(r => ({ ...r, translations: mapTranslations(r) }));
}

function mapTranslations<T extends MinimalTranslatedRouteFragment>(route: T) {
    const translations = route.translations.map(t => ({
        ...t,
        route: t.language.isFallback ? t.route : `/${t.language.short}${pathOrEmpty(t.route)}`,
    }));

    const serverRouteTrans = route.translations.find(t => t.language.short === "en");
    const serverRouteInTranslations = translations.find(t => t.route === serverRouteTrans.route);
    if (!serverRouteInTranslations) {
        translations.push(serverRouteTrans);
    }

    return translations;
}

function pathOrEmpty(path: string) {
    return path === "/" ? "" : path;
}
