<script lang="ts">
    import type { PageData } from "./$types";
    import Page from "../../../components/Page.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { siteInfo, routes, post } = data;
</script>

<Page backButton {routes} {siteInfo} title={{ title: post.title, small: true }}>
    <span class="text-slate-400">{new Date(post.date_created).toLocaleDateString()}</span>
    <section class="mt-8 grid grid-rows-[min-content_min-content] gap-8 md:grid-cols-[60%_40%]">
        <img alt="Cover" class="animate-fadeIn md:col-start-2" src={post.cover} />
        <article
            class="animate-fadeInTopSubtle hyphens-auto text-justify *:mb-2 md:col-start-1 md:row-start-1">
            {@html post.content}
        </article>
    </section>
</Page>
