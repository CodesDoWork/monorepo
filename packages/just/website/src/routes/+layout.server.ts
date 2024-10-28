import { getDirectus, getRoutes, getSiteInfo } from "../helpers/directus";
import type { PageInfo } from "../types/frontend";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }): Promise<LayoutData> => {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    const currentRoute = routes.find(r => r.route === url.pathname);

    return { siteInfo, routes, currentRoute };
};

type Route = ReturnType<typeof getRoutes> extends Promise<Array<infer T>> ? T : never;

export type LayoutData = {
    siteInfo: PageInfo;
    routes: Route[];
    currentRoute: Route | undefined;
};
