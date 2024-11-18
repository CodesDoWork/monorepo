import { JustSiteRoutes } from "@codesdowork/just-cms-types";
import { getDirectus, getRoutes, getSiteInfo } from "../helpers/directus";
import type { PageInfo } from "../types/frontend";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }): Promise<LayoutData> => {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    const currentRoute = routes.find(r => r.route === url.pathname);

    return { siteInfo, routes, currentRoute };
};

export type LayoutData = {
    siteInfo: PageInfo;
    routes: JustSiteRoutes[];
    currentRoute: JustSiteRoutes | undefined;
};
