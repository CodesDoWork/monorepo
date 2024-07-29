<script lang="ts">
    import Page from "../../components/Page.svelte";
    import type { PageData } from "./$types";
    import Posts from "../../components/Posts.svelte";
    import Heading from "../../components/Heading.svelte";

    export let data: PageData;
    const { siteInfo, routes, posts } = data;
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: "Blog", small: true}}>
    <Heading class="mt-8" level="h3">Featured Posts</Heading>
    <Posts posts={posts.filter(p => p.featured)}/>
    <Heading class="mt-16" level="h3">All Posts</Heading>
    <Posts {posts}/>
</Page>
