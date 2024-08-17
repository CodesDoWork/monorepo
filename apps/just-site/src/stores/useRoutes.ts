import { afterNavigate } from "$app/navigation";
import { onMount } from "svelte";
import { readable } from "svelte/store";
import type { Route } from "../types/frontend";

export function useRoutes(routeLinks: Route[]) {
    const currentRoute = readable<Route | undefined>(undefined, set => {
        onMount(() => set(getRouteForPath(routeLinks, window.location.pathname)));
    });

    const previousRoute = readable<Route | undefined>(undefined, set => {
        afterNavigate(({ from }) =>
            set(from?.route?.id ? getRouteForPath(routeLinks, from.route.id) : undefined),
        );
    });

    return { currentRoute, previousRoute };
}

function getRouteForPath(routeLinks: Route[], path: string) {
    return routeLinks
        .filter(r => path.startsWith(r.route))
        .sort((a, b) => b.route.length - a.route.length)[0];
}
