import { onMount } from "svelte";
import { afterNavigate } from "$app/navigation";
import { readable } from "svelte/store";
import type { JustSiteRoutes } from "../types/directus";

export function useRoutes(routeLinks: JustSiteRoutes[]) {
    const currentRoute = readable<JustSiteRoutes | undefined>(undefined, set => {
        onMount(() => {
            const path = window.location.pathname;
            set(routeLinks.find(r => r.route === path));
        });
    });

    const previousRoute = readable(undefined, set => {
        afterNavigate(({ from }) => {
            set(routeLinks.find(r => r.route === from?.route.id));
        });
    });

    return { currentRoute, previousRoute };
}
