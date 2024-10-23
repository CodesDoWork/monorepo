import { error } from "@sveltejs/kit";
import { getBlogPost, getDirectus } from "../../../helpers/directus";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const directus = await getDirectus();
    const post = await getBlogPost(directus, params.slug);
    if (!post) {
        error(404, "Post not found");
    }

    return { post };
};
