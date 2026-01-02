import { API_ROUTE } from "../../routes/api/constants";
import { ROUTE_PARAM } from "../../routes/api/getRoute/config";

export async function reroutePath(url: URL, fetch: typeof window.fetch): Promise<string> {
    const path = url.pathname;
    if (path.startsWith(API_ROUTE)) {
        return path;
    }

    const newPath = await fetch(`${API_ROUTE}/getRoute?${ROUTE_PARAM}=${path}`)
        .then(res => res.text())
        .then(route => (route === path ? undefined : route || undefined));

    if (newPath) {
        return `${newPath}${url.search}${url.hash}`;
    }

    return path;
}
