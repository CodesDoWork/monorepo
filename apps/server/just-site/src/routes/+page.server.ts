import type { PageServerLoad } from "./$types";
import { getDirectus, getRoutes, getSiteInfo } from "../helpers/directus";

export const load: PageServerLoad = async () => {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    return { siteInfo, routes };
};
