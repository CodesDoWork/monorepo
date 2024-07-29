<script lang="ts">
    import Page from "../../../components/Page.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { siteInfo, routes, post } = data;
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: post.title, small: true}} backButton>
    <section class="mt-16 grid gap-8 grid-rows-[min-content_min-content] md:grid-cols-[60%_40%]">
        <img alt="Cover" class="md:col-start-2" src={post.cover} />
        <article class="md:col-start-1 md:row-start-1">{@html post.content}</article>
    </section>
</Page>
