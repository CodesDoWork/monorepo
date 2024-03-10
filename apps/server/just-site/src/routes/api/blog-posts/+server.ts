import GhostContentAPI from "@tryghost/content-api";
import { env } from "../../../env";

const api = new GhostContentAPI({
    url: "https://blog.justinkonratt.com",
    key: env.GHOST_API_KEY,
    version: "v5.0",
});

export async function GET({ url }) {
    const limit = url.searchParams.get("limit");
    const page = url.searchParams.get("page");
    const posts = await api.posts.browse({ limit, page, include: ["tags", "authors"] });

    return new Response(JSON.stringify({ posts }));
}
