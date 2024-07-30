<script lang="ts">
    import Page from "../../../components/Page.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { siteInfo, routes, post } = data;

    let postContent;
    $: console.log(postContent);
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: post.title, small: true}} backButton>
    <span class="text-slate-400">{new Date(post.date_created).toLocaleDateString()}</span>
    <section class="mt-8 grid gap-8 grid-rows-[min-content_min-content] md:grid-cols-[60%_40%]">
        <img alt="Cover" class="md:col-start-2 animate-fadeIn" src={post.cover} />
        <article class="md:col-start-1 md:row-start-1 *:mb-2 text-justify hyphens-auto animate-fadeInTopSubtle">{@html post.content}</article>
    </section>
</Page>
