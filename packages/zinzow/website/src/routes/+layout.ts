import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url, data }) => {
    return {
        ...data,
        baseUrl: url.origin,
        currentRoute: data.routes.find(r => r.path === url.pathname),
    };
};
