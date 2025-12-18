import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url, data }) => {
    return {
        ...data,
        currentRoute: data.routes.find(r => r.path === url.pathname),
    };
};
