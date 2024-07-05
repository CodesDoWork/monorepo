<script lang="ts">
    import type { PageData } from "./$types";
    import Page from "../../components/Page.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { toLinkFriendly } from "../../helpers/toLinkFriendly";
    import { animationDelay } from "../../helpers/animationDelay";
    import BookCategory from "../../components/BookCategory.svelte";
    import { onMount } from "svelte";
    import { readable } from "svelte/store";

    export let data: PageData;
    const { siteInfo, routes } = data;

    let books = readable([], set =>
    onMount(() => {
        fetch("/api/reading-list").then(res => res.json()).then(set);
    }));
    $: categories = new Set($books.flatMap(book => book.categories).sort());

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);
</script>

<Page loading={!$books.length} routes={routes} siteInfo={siteInfo} title={{title: "Reading List", small: true}}>
    <p class="mb-2 italic">
        Here are some of the books I've read. I tagged my recommendation but every book on this list is great and worth reading.
        I didn't include every book I've read in the list because not every book is worth it.
        More books are about to come soon, since I just can't (and don't want to) stop reading.
    </p>
    <p class="text-red-500 mb-4">
        ⚠️<b>Warning</b>⚠️<br />
        Always apply your own truth and critical thinking.
    </p>
    <Heading level="h3">Categories</Heading>
    <ol class="list-disc list-inside">
        <li>
            <Link href="#Featured" smoothScroll title="Featured">Featured</Link>
        </li>
        {#each categories as category}
            <li>
                <Link title={category}
                      href={`#${toLinkFriendly(category)}`}
                      smoothScroll>
                    {category}
                </Link>
            </li>
        {/each}
    </ol>
    <hr class="my-8 opacity:50 dark:opacity-20" />
    <BookCategory books={$books} category="Featured" {getCardStyle} />
    {#each categories as category}
        <BookCategory {category} books={$books} {getCardStyle} />
    {/each}
</Page>
