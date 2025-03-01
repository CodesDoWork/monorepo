import type { LayoutLoad } from "./$types";
import { useRoutes } from "../stores/use-routes";

export const load: LayoutLoad = ({ data, url }) => {
    const routes = useRoutes(data.routes, url.pathname);

    return { ...data, ...routes };
};
