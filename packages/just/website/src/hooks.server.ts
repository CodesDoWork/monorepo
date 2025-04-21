import type { Handle, HandleServerError } from "@sveltejs/kit";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { redirect } from "@sveltejs/kit";
import { GetHooksServerData } from "./graphql/default/generated/gql";
import { byLanguage, getLanguage } from "./shared/language";
import { priorityRoutes } from "./shared/navigation/priority-routes";
import { getRoute, transformRoutes } from "./shared/routes";

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    if (priorityRoutes.some(route => path.startsWith(route))) {
        return resolve(event);
    }

    const { languages, routes } = await toPromise(GetHooksServerData({}));
    const language = await getLanguage(event.request, event.cookies, languages);

    const transformedRoutes = transformRoutes(routes);
    const currentRoute = getRoute(transformedRoutes, path);
    const desiredRoute = currentRoute?.translations.find(byLanguage(language)).route;

    if (desiredRoute !== undefined && path !== desiredRoute) {
        return redirect(307, desiredRoute);
    }

    const { request } = event;
    const hasAccept = request.headers.has("accept") && request.headers.get("accept") !== "*/*";
    if (currentRoute && !hasAccept) {
        // svelte returns 405 for accept */* for paths "/" and "/[lang]"
        event.request.headers.set("accept", "text/html");
    }

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", language.short),
    });

    if (response.headers.get("content-type") === "text/html") {
        response.headers.set("content-language", language.short);
        response.headers.set("cache-control", "public, s-maxage=300, stale-while-revalidate=86400");
    }

    return response;
};

export const handleError: HandleServerError = async ({ error, status, message }) => {
    console.error(error);

    return {
        message: status >= 500 ? "Something went wrong" : message,
    };
};
