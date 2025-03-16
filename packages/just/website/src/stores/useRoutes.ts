import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
import { afterNavigate } from "$app/navigation";
import { onMount } from "svelte";
import { readable } from "svelte/store";

export function useRoutes(routeLinks: JustSiteRoutes[]) {
    const currentRoute = readable<JustSiteRoutes | undefined>(undefined, set => {
        onMount(() => set(getRouteForPath(routeLinks, window.location.pathname)));
    });

    const previousRoute = readable<JustSiteRoutes | undefined>(undefined, set => {
        afterNavigate(({ from }) =>
            set(from ? getRouteForPath(routeLinks, from.route.id) : undefined),
        );
    });

    currentRoute.subscribe(() => {});
    previousRoute.subscribe(() => {});

    return { currentRoute, previousRoute };
}

function getRouteForPath(routeLinks: JustSiteRoutes[], path: string) {
    return routeLinks
        .filter(r => path.startsWith(r.route))
        .sort((a, b) => b.route.length - a.route.length)[0];
}
