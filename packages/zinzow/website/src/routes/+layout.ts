import { useRoutes } from "../stores/use-routes";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ data, url }) => {
    const routes = useRoutes(data.routes, url.pathname);

    return { ...data, ...routes };
};
