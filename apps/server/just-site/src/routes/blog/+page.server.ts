import GhostContentAPI from "@tryghost/content-api";
import { env } from "../../env";

const api = new GhostContentAPI({
    url: "https://blog.justinkonratt.com",
    key: env.GHOST_API_KEY,
    version: "v5.0",
});

export async function load() {
    const featuredPosts = await api.posts.browse({
        filter: "featured:true",
        include: ["tags", "authors"],
    });

    return { featuredPosts };
}
