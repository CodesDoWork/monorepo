<script lang="ts">
    import Page from "../../components/Page.svelte";
    import { config } from "../../config";
    import { useBookData } from "../../stores/useBookData";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import BookCategory from "../../components/BookCategory.svelte";

    const { readingList } = config;
    const bookData = useBookData(readingList);
    const categories = new Set(readingList.flatMap(book => book.categories).sort());

    let animationIx = 0;
    const getCardStyle = () => {
        return `animation-delay: ${animationIx++ * 0.1}s;`;
    };

    $: loading = !$bookData.length;
</script>

<Page loading={loading} title={{title: "Reading List", small: true}}>
    <p class="mb-2 italic">
        Here are some of the books I've read. I tagged my recommendations and added ratings based on my
        personal opinion. I didn't include every book I've read in the list because not every book is worth it.<br/>
        Regardless of the relative rating, every book on this list is great and worth reading.
        More books are about to come soon, since I just can't (don't want to) stop reading.
    </p>
    <p class="text-red-500 mb-4">
        ⚠️<b>Warning</b>⚠️<br/>
        Always apply your own truth and critical thinking.
    </p>
    <Heading level="h3">Categories</Heading>
    <ol class="list-disc list-inside">
        <li>
            <Link href="#Featured" smoothScroll title="Featured">Featured</Link>
        </li>
        {#each categories as category}
            <li>
                <Link title={category} href={`#${category}`} smoothScroll>{category}</Link>
            </li>
        {/each}
    </ol>
    <hr class="my-8 opacity:50 dark:opacity-20" />
    <BookCategory books={$bookData} category="Featured" getCardStyle={getCardStyle} />
    {#each categories as category}
        <BookCategory category={category} books={$bookData} getCardStyle={getCardStyle} />
    {/each}
</Page>
