<script lang="ts">
    import Page from "../../components/Page.svelte";
    import type { PageData } from "./$types";
    import type { PostOrPage } from "@tryghost/content-api";
    import Posts from "../../components/Posts.svelte";
    import Heading from "../../components/Heading.svelte";
    import { actionWhenInViewport } from "../../actions/actionWhenInViewport";

    export let data: PageData;
    const { siteInfo, routes, featuredPosts } = data;

    let page = 0;
    const limit = 10;

    let posts: PostOrPage[] = [];
    let newBatch: PostOrPage[] = [];
    let hasMore = true;

    const fetchData = async() => {
        if(!hasMore) {
            return;
        }

        const response = await fetch(`/api/blog-posts?limit=${limit}&page=${++page}`).then(res => res.json());
        newBatch = response.posts;
        if (newBatch.length < limit) {
            hasMore = false;
        }
    }

    $: posts = [...posts, ...newBatch]
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: "Blog", small: true}}>
    <Heading class="mt-8" level="h3">Featured Posts</Heading>
    <Posts posts={featuredPosts}/>
    <Heading class="mt-16" level="h3">All Posts</Heading>
    <Posts {posts}/>
    <div class="w-0" use:actionWhenInViewport={fetchData} />
</Page>
