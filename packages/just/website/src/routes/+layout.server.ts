import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
import type { PageInfo } from "../types/frontend";
import type { LayoutServerLoad } from "./$types";
import { getDirectus, getRoutes, getSiteInfo } from "../helpers/directus";

export const load: LayoutServerLoad = async ({ url }): Promise<LayoutData> => {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    const currentRoute = routes.find(r => r.route === url.pathname);

    return { siteInfo, routes, currentRoute };
};

export interface LayoutData {
    siteInfo: PageInfo;
    routes: JustSiteRoutes[];
    currentRoute: JustSiteRoutes | undefined;
}
