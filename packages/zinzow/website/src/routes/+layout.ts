import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url, data }) => {
    const path = decodeURI(url.pathname);

    return {
        ...data,
        baseUrl: url.origin,
        currentRoute: data.routes.find(r => r.path === path),
    };
};
