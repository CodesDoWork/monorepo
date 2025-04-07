import type { Route, ServerRoute } from "../routes/types";
import { afterNavigate } from "$app/navigation";
import { readonly, writable } from "svelte/store";

export function useRoutes(routes: Route[], serverRoutes: ServerRoute[], initialRoute: Route) {
    const currentRoute = writable(initialRoute);
    const previousRoute = writable<Route | undefined>();

    afterNavigate(({ from, to }) => {
        currentRoute.set(getRouteForPath(routes, serverRoutes, to.route.id));
        if (from) {
            previousRoute.set(getRouteForPath(routes, serverRoutes, from.route.id));
        }
    });

    return {
        currentRoute: readonly(currentRoute),
        previousRoute: readonly(previousRoute),
    };
}

function getRouteForPath(routes: Route[], serverRoutes: ServerRoute[], path: string): Route {
    return routes.find(
        route =>
            route.id ===
            serverRoutes
                .filter(r => path.startsWith(r.route))
                .sort((a, b) => b.route.length - a.route.length)[0].id,
    );
}
