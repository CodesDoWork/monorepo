<script lang="ts">
    import type { Book } from "../../types/frontend";
    import Heading from "../../components/Heading.svelte";
    import { toLinkFriendly } from "../../helpers/toLinkFriendly";
    import BookCard from "./BookCard.svelte";

    export let category: string;
    export let books: Book[];
    export let getCardStyle: () => string;
</script>

<Heading class="mt-8" id={toLinkFriendly(category)} level="h3">{category}</Heading>
<ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 content-stretch">
    {#each books.filter(book => category === "Featured" ? book.featured : book.categories.includes(category)) as book}
        <li>
            <BookCard style={getCardStyle()} book={book} />
        </li>
    {/each}
</ul>
