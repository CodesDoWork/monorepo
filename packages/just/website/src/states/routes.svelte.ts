import type { Route, ServerRoute } from "../routes/types";
import { afterNavigate } from "$app/navigation";
import { byId } from "@cdw/monorepo/shared-utils/filters";

export function getRoutes(routes: Route[], serverRoutes: ServerRoute[], initialRoute: Route) {
    let currentRoute = $state(initialRoute);
    let previousRoute = $state<Route | undefined>();

    afterNavigate(({ from, to }) => {
        currentRoute = getRouteForPath(routes, serverRoutes, to.route.id);
        if (from) {
            previousRoute = getRouteForPath(routes, serverRoutes, from.route.id);
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

function getRouteForPath(routes: Route[], serverRoutes: ServerRoute[], path: string): Route {
    return routes.find(
        byId(
            serverRoutes
                .filter(r => path.startsWith(r.route))
                .sort((a, b) => b.route.length - a.route.length)[0].id,
        ),
    );
}
