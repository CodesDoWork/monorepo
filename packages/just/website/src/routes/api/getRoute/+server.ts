import type { RequestHandler } from "@sveltejs/kit";
import { error, text } from "@sveltejs/kit";
import { defaultClient } from "../../../graphql/default/client";
import { GetApiGetRouteServerDataDocument } from "../../../graphql/default/generated/graphql";
import { byLanguage } from "../../../shared/language";
import { getRoute, transformRoutes } from "../../../shared/routes";
import { ROUTE_PARAM } from "./config";

export const GET: RequestHandler = async ({ request }) => {
    const params = new URL(request.url).searchParams;
    if (!params.has(ROUTE_PARAM)) {
        return error(400, `Parameter "${ROUTE_PARAM}" must be provided!`);
    }

    const { data: apiGetRoutesServerData } = await defaultClient.query({
        query: GetApiGetRouteServerDataDocument,
    });
    const { routes, languages } = apiGetRoutesServerData;
    const transformedRoutes = transformRoutes(routes);
    const defaultLanguage = languages[0];

    const requestedRoute = params.get(ROUTE_PARAM);
    const route = getRoute(transformedRoutes, requestedRoute);
    const englishRoute = route?.translations.find(byLanguage(defaultLanguage))?.route;

    return text(englishRoute?.replace(/en(\/|$)/, "") ?? requestedRoute);
};
