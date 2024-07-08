import { ghostApi } from "../../helpers/ghostApi";

export async function load() {
    const featuredPosts = await ghostApi.posts.browse({
        filter: "featured:true",
        include: ["tags", "authors"],
    });

    return { featuredPosts };
}
