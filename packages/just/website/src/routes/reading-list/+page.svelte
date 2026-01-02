<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { smoothScrollTo } from "@cdw/monorepo/shared-utils/html/client";
    import { normalizeAnchor } from "@cdw/monorepo/shared-utils/html/common";
    import { H3, Link, P } from "../../components/texts";
    import BookCategory from "./BookCategory.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { books, categories, texts, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    $effect(() => {
        if (page.url.hash) {
            setTimeout(() => smoothScrollTo(window.location.hash), 0);
        }
    });
</script>

<P>{texts.intro}</P>
<P class="text-red-600!">
    ⚠️<b>{texts.warning}</b>⚠️<br />{texts.warningContent}
</P>
<H3>{texts.categories}</H3>
<ol
    class="
        list-inside list-disc
        sm:columns-2
        xl:columns-3
        2xl:columns-4
    ">
    <li>
        <Link href={`#${normalizeAnchor(texts.featured)}`} smoothScroll title={texts.featured}>
            {texts.featured}
        </Link>
    </li>
    {#each categories as category}
        <li>
            <Link title={category} href={`#${normalizeAnchor(category)}`} smoothScroll>
                {category}
            </Link>
        </li>
    {/each}
</ol>
<hr
    class="
        opacity:50
        my-8
        dark:opacity-20
    " />
<BookCategory {books} category={texts.featured} featuredText={texts.featured} />
{#each categories as category, idx (idx)}
    <BookCategory
        {category}
        {books}
        categoryIndex={(idx + 1) / 2}
        style={animationDelay((idx + 1) / 2)}
        featuredText={texts.featured} />
{/each}
