import type { MinimalTranslatedRouteFragment } from "../graphql/default/generated/gql";

export function getRoute<T extends MinimalTranslatedRouteFragment>(
    routes: T[],
    path: string,
): T | undefined {
    const allRoutes = routes.flatMap(r => r.translations.map(t => ({ ...t, id: r.id })));
    allRoutes.sort((r1, r2) => r2.route.length - r1.route.length);
    const id = allRoutes.find(r => path === r.route)?.id;

    return id ? routes.find(r => r.id === id) : undefined;
}

export function transformRoutes<T extends MinimalTranslatedRouteFragment>(routes: T[]) {
    return routes.map(r => ({
        ...r,
        translations: r.translations.map(t => ({
            ...t,
            route: t.language.isFallback ? t.route : `/${t.language.short}${pathOrEmpty(t.route)}`,
        })),
    }));
}

export function pathOrEmpty(path: string) {
    return path === "/" ? "" : path;
}
