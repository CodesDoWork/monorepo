import { getBlogPosts, getDirectus } from "../../helpers/directus";

export async function load() {
    const directus = await getDirectus();
    const posts = await getBlogPosts(directus);

    return { posts };
}
