import { ghostApi } from "../../../helpers/ghostApi";

export async function GET({ url }) {
    const limit = url.searchParams.get("limit");
    const page = url.searchParams.get("page");
    const posts = await ghostApi.posts.browse({ limit, page, include: ["tags", "authors"] });

    return new Response(JSON.stringify({ posts }));
}
