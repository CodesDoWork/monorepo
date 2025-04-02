import type { Route } from "../routes/types";
import { afterNavigate } from "$app/navigation";
import { readonly, writable } from "svelte/store";

export function useRoutes(routeLinks: Route[], initialRoute: Route) {
    const currentRoute = writable(initialRoute);
    const previousRoute = writable<Route | undefined>();

    afterNavigate(({ from, to }) => {
        currentRoute.set(getRouteForPath(routeLinks, to.route.id));
        if (from) {
            previousRoute.set(getRouteForPath(routeLinks, from.route.id));
        }
    });

    return {
        currentRoute: readonly(currentRoute),
        previousRoute: readonly(previousRoute),
    };
}

function getRouteForPath(routeLinks: Route[], path: string): Route {
    return routeLinks
        .filter(r => path.startsWith(r.route))
        .sort((a, b) => b.route.length - a.route.length)[0];
}
