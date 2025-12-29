import type { Handle, HandleServerError } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { queryDefault } from "./graphql/default/client";
import { GetHooksServerDataDocument } from "./graphql/default/generated/graphql";
import { byLanguage, getLanguage } from "./shared/language";
import { priorityRoutes } from "./shared/navigation/priority-routes";
import { getRoute, transformRoutes } from "./shared/routes";

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    if (priorityRoutes.some(route => path.startsWith(route))) {
        return resolve(event);
    }

    const hooksServerData = await queryDefault({
        query: GetHooksServerDataDocument,
    });
    const { languages, routes } = hooksServerData;
    const transformedRoutes = transformRoutes(routes);
    const language = await getLanguage(event.request, event.cookies, languages, transformedRoutes);

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
