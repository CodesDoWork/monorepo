<script lang="ts">
    import type { PageData } from "./$types";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { animationDelay } from "../../shared/animationDelay";
    import { toLinkFriendly } from "../../shared/toLinkFriendly";
    import BookCategory from "./BookCategory.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { books, categories, texts, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);
</script>

<p class="mb-2 italic">{texts.intro}</p>
<p class="mb-4 text-red-500">
    ⚠️<b>{texts.warning}</b>⚠️<br />{texts.warningContent}
</p>
<Heading level="h3">{texts.categories}</Heading>
<ol class="list-inside list-disc sm:columns-2 xl:columns-3 2xl:columns-4">
    <li>
        <Link href={`#${toLinkFriendly(texts.featured)}`} smoothScroll title={texts.featured}>
            {texts.featured}
        </Link>
    </li>
    {#each categories as category}
        <li>
            <Link title={category} href={`#${toLinkFriendly(category)}`} smoothScroll>
                {category}
            </Link>
        </li>
    {/each}
</ol>
<hr class="opacity:50 my-8 dark:opacity-20" />
<BookCategory {books} category={texts.featured} {getCardStyle} featuredText={texts.featured} />
{#each categories as category}
    <BookCategory {category} {books} {getCardStyle} featuredText={texts.featured} />
{/each}
