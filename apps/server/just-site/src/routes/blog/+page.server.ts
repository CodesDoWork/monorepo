import { getDirectus, getRoutes, getSiteInfo } from "../../helpers/directus";
import { ghostApi } from "../../helpers/ghostApi";

export async function load() {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);

    const featuredPosts = await ghostApi.posts.browse({
        filter: "featured:true",
        include: ["tags", "authors"],
    });

    return { siteInfo, routes, featuredPosts };
}
