import { config } from "../config";
import { onMount } from "svelte";
import { afterNavigate } from "$app/navigation";
import { readable } from "svelte/store";

const { routeLinks } = config;

export function useRoutes() {
    const currentRoute = readable(undefined, set => {
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
