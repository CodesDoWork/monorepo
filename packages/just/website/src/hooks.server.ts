import type { Handle, HandleServerError } from "@sveltejs/kit";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { redirect } from "@sveltejs/kit";
import { GetHooksServerData } from "./graphql/default/generated/gql";
import { API_ROUTE } from "./routes/api/constants";
import { getLanguage } from "./shared/language";
import { getRoute } from "./shared/routes";

export const handle: Handle = async ({ event, resolve }) => {
    const path = event.url.pathname;
    if (path.startsWith(API_ROUTE)) {
        return resolve(event);
    }

    const { languages, routes } = await toPromise(GetHooksServerData({}));
    const language = await getLanguage(event.request, event.cookies, languages);

    const currentRoute = getRoute(routes, path);
    const desiredRoute = currentRoute?.translations.find(
        t => t.language.code === language.code,
    ).route;

    if (desiredRoute !== undefined && path !== desiredRoute) {
        return redirect(307, desiredRoute);
    }

    return resolve(event);
};

export const handleError: HandleServerError = async ({ error, status, message }) => {
    console.error(error);

    return {
        message: status >= 500 ? "Something went wrong" : message,
    };
};
