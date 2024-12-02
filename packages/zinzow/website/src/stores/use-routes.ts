import { afterNavigate, onNavigate } from "$app/navigation";
import { onMount } from "svelte";
import { readable } from "svelte/store";

interface Route {
    name: string;
    path: string;
}

export function useRoutes<T extends Route>(routes: T[], path: string) {
    function getRouteForPath(path: string): T | undefined {
        return routes
            .filter(r => path.startsWith(r.path))
            .sort((a, b) => b.path.length - a.path.length)[0];
    }

    const currentRoute = readable<T | undefined>(getRouteForPath(path), set => {
        const update = () => set(getRouteForPath(window.location.pathname));
        onMount(update);
        onNavigate(update);
    });

    const previousRoute = readable<T | undefined>(undefined, set => {
        afterNavigate(({ from }) => set(from ? getRouteForPath(from.route.id) : undefined));
    });

    return { currentRoute, previousRoute };
}
