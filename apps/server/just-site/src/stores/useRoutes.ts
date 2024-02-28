import { config } from "../config";
import { onMount } from "svelte";
import { afterNavigate } from "$app/navigation";
import { readable } from "svelte/store";
import type { RouteLink } from "../types/Config";

const { routeLinks } = config;

export function useRoutes() {
    const currentRoute = readable<RouteLink | undefined>(undefined, set => {
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

    return { routeLinks, currentRoute, previousRoute };
}
