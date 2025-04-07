import { MinimalTranslatedRouteFragment } from "../graphql/default/generated/gql";

export function getRoute<T extends MinimalTranslatedRouteFragment>(
    routes: T[],
    path: string,
): T | undefined {
    const allRoutes = routes.flatMap(r => r.translations.map(t => ({ ...t, id: r.id })));
    allRoutes.sort((r1, r2) => r2.route.length - r1.route.length);
    const id = allRoutes.find(r => path.startsWith(r.route))?.id;

    return id ? routes.find(r => r.id === id) : undefined;
}
