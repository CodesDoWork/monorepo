<script lang="ts">
    import Page from "../../../components/Page.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { siteInfo, routes, post } = data;
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: post.title, small: true}} backButton>
    <section class="mt-16 md:grid md:gap-8 md:grid-cols-[60%_40%]">
        <article>{@html post.content}</article>
        <img alt="Cover" src={post.cover} />
    </section>
</Page>
