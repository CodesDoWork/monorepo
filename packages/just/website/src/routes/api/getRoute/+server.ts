import type { RequestHandler } from "@sveltejs/kit";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { error, text } from "@sveltejs/kit";
import { GetApiGetRouteServerData } from "../../../graphql/default/generated/gql";
import { getRoute } from "../../../shared/routes";
import { ROUTE_PARAM } from "./config";

export const GET: RequestHandler = async ({ request }) => {
    const params = new URL(request.url).searchParams;
    if (!params.has(ROUTE_PARAM)) {
        return error(400, `Parameter "${ROUTE_PARAM}" must be provided!`);
    }

    const requestedRoute = params.get(ROUTE_PARAM);
    const { routes, languages } = await toPromise(GetApiGetRouteServerData({}));
    const defaultLanguage = languages[0];

    return text(
        getRoute(routes, requestedRoute)?.translations.find(
            t => t.language.code === defaultLanguage.code,
        )?.route ?? requestedRoute,
    );
};
