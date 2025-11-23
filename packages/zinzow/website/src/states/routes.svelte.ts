import { afterNavigate } from "$app/navigation";

interface Route {
    name: string;
    path: string;
}

export function getRoutes<T extends Route>(routes: T[], initialRoute: T) {
    let currentRoute = $state<T | undefined>(initialRoute);
    let previousRoute = $state<T | undefined>();

    afterNavigate(({ from, to }) => {
        currentRoute = getRouteForPath(routes, to.route.id);
        if (from) {
            previousRoute = getRouteForPath(routes, from.route.id);
        }
    });

    return {
        get currentRoute() {
            return currentRoute;
        },
        get previousRoute() {
            return previousRoute;
        },
    };
}

function getRouteForPath<T extends Route>(routes: T[], path: string): T | undefined {
    return routes
        .filter(r => path.startsWith(r.path) && (r.path !== "/" || path === "/"))
        .sort((a, b) => b.path.length - a.path.length)[0];
}
