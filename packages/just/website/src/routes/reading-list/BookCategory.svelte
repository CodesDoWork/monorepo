<script lang="ts">
    import type { Book } from "./types";
    import Heading from "../../components/Heading.svelte";
    import { toLinkFriendly } from "../../shared/toLinkFriendly";
    import BookCard from "./BookCard.svelte";

    interface Props {
        category: string;
        books: Book[];
        getCardStyle: () => string;
        featuredText: string;
    }

    const { category, books, getCardStyle, featuredText }: Props = $props();

    function byCategory(category: string) {
        return function (book: Book) {
            return category === featuredText ? book.featured : book.categories.includes(category);
        };
    }
</script>

<Heading class="mt-8" id={toLinkFriendly(category)} level="h3">{category}</Heading>
<ul class="grid grid-cols-1 content-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {#each books.filter(byCategory(category)) as book}
        <li>
            <BookCard style={getCardStyle()} {book} {featuredText} />
        </li>
    {/each}
</ul>
