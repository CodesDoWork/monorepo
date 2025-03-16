<script lang="ts">
    import type { PageData } from "./$types";
    import Heading from "../../components/Heading.svelte";
    import Page from "../../components/Page.svelte";
    import Posts from "./Posts.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    const { siteInfo, routes, posts } = data;
    const featuredPosts = posts.filter(post => post.featured);
</script>

<Page {routes} {siteInfo} title={{ title: "Blog", small: true }}>
    <Heading class="mt-8" level="h3">Featured Posts</Heading>
    <Posts posts={featuredPosts} />
    <Heading class="mt-16" level="h3">All Posts</Heading>
    <Posts {posts} startWithIdx={featuredPosts.length} />
</Page>
