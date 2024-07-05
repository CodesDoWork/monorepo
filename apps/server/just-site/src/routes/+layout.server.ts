import type { PageServerLoad } from "./$types";
import { getDirectus, getRoutes, getSiteInfo } from "../helpers/directus";

export const load: PageServerLoad = async ({ url }) => {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    const currentRoute = routes.find(r => r.route === url.pathname);

    return { siteInfo, currentRoute };
};
