<script lang="ts">
    import type { Book } from "./types";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Label from "../../components/Label.svelte";

    interface Props {
        book: Book;
        style: string | undefined;
    }

    const { book, style }: Props = $props();
</script>

<Card class="grid h-full grid-cols-[auto_1fr] items-start gap-4 p-2" {style}>
    <img alt="no cover" class="max-w-20 rounded sm:max-w-32 md:max-w-48" src={book.cover} />
    <div>
        <Heading level="h6" class="mt-1" commandStyle={false}>{book.title}</Heading>
        <ul class="items-center text-sm">
            {#each book.authors as author}
                <li>{author}</li>
            {/each}
        </ul>
    </div>
    <p class="col-span-2">{book.description}</p>
    <ul class="col-span-2 flex flex-wrap gap-2">
        {#if book.featured}
            <Label tag="li" class="!bg-red-500 !bg-opacity-70" name="Featured" />
        {/if}
        {#each book.categories as category}
            <Label tag="li" name={category} />
        {/each}
    </ul>
</Card>
