import type { Handle, HandleServerError, RequestEvent } from "@sveltejs/kit";
import type { LanguageFragment } from "./graphql/default/generated/graphql";
import type { TransformedRoute } from "./lib/common/routes";
import { hasAccept, isJsonRequest } from "@cdw/monorepo/shared-svelte-utils/requests";
import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";
import { redirect } from "@sveltejs/kit";
import { queryDefault } from "./graphql/default/client";
import { GetHooksServerDataDocument } from "./graphql/default/generated/graphql";
import { priorityRoutes } from "./lib/common/priority-routes";
import { reroutePath } from "./lib/common/reroute";
import { getRoute, transformRoutes } from "./lib/common/routes";
import { byLanguage, getLanguage } from "./lib/server/language";

export const handleError: HandleServerError = async ({ status, message }) => {
    return {
        message: status >= HttpStatusCode.INTERNAL_SERVER_ERROR ? "Something went wrong" : message,
    };
};

export const handle: Handle = async ({ event, resolve }) => {
    const path = decodeURI(event.url.pathname);
    if (priorityRoutes.some(route => path.startsWith(route))) {
        return resolve(event);
    }

    return handleNonPriorityRequest({ event, resolve }, path);
};

async function handleNonPriorityRequest({ event, resolve }: Parameters<Handle>[0], path: string) {
    if (!isJsonRequest(event.request)) {
        return handleNonJsonRequest({ event, resolve }, path);
    }

    const desiredPath = await reroutePath(event.url, event.fetch);
    if (desiredPath !== undefined && path !== desiredPath) {
        redirect(HttpStatusCode.TEMPORARY_REDIRECT, desiredPath);
    }
    return resolve(event);
}

async function handleNonJsonRequest({ event, resolve }: Parameters<Handle>[0], path: string) {
    const { currentRoute, language } = await getRequestData(event, path);
    redirectToDesiredRoute(currentRoute, language, path);

    if (currentRoute && !hasAccept(event.request)) {
        // svelte returns 405 for accept */* for paths "/" and "/[lang]"
        event.request.headers.set("accept", "text/html");
    }

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('lang="en"', `lang="${language.short}"`),
    });
    setHtmlHeaders(response, language);

    return response;
}

async function getRequestData(event: RequestEvent, path: string) {
    const { languages, routes } = await queryDefault({ query: GetHooksServerDataDocument });
    const transformedRoutes = transformRoutes(routes);
    return {
        currentRoute: getRoute(transformedRoutes, path),
        language: await getLanguage(event.request, event.cookies, languages, transformedRoutes),
    };
}

function redirectToDesiredRoute(
    currentRoute: TransformedRoute | undefined,
    language: LanguageFragment,
    path: string,
) {
    const desiredRoute = currentRoute?.translations.find(byLanguage(language)).route;
    if (desiredRoute !== undefined && path !== desiredRoute) {
        redirect(HttpStatusCode.TEMPORARY_REDIRECT, desiredRoute);
    }
}

function setHtmlHeaders(response: Response, language: LanguageFragment) {
    if (response.headers.get("content-type") === "text/html") {
        response.headers.set("content-language", language.short);
        response.headers.set("cache-control", "public, s-maxage=300, stale-while-revalidate=86400");
    }
}
