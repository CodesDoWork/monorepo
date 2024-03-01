<script lang="ts">
    import BookCard from "./BookCard.svelte";
    import Heading from "./Heading.svelte";
    import type { Book, BookCategory } from "../types/Book";
    import { toLinkFriendly } from "../helpers/toLinkFriendly";

    export let category: BookCategory | "Featured";
    export let books: Book[];
    export let getCardStyle: () => string;
</script>

<Heading class="mt-8" id={toLinkFriendly(category)} level="h3">{category}</Heading>
<ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 content-stretch">
    {#each books.filter(book => category === "Featured" ? book.featured : book.categories.includes(category)) as book }
        <li>
            <BookCard style={getCardStyle()} book={book} />
        </li>
    {/each}
</ul>
