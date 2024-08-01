<script lang="ts">
    import Card from "../../components/Card.svelte";
    import Link from "../../components/Link.svelte";
    import Label from "../../components/Label.svelte";
    import type { Book } from "./book";

    export let book: Book;
    export let style = undefined;
</script>

<Card class="p-2 grid grid-cols-[auto_1fr] gap-4 items-start h-full" style={style}>
    <Link href={book.url || ""} noStyle title={book.title}>
        <img alt="no cover" class="rounded max-w-20 sm:max-w-32 md:max-w-48"
             src={typeof book.cover === "string" ? book.cover : book.cover?.medium} />
    </Link>
    <div>
        <ul class="flex items-center mb-1 text-sm">
            {#each book.authors || [] as author}
                <li>
                    <Link href={author.url || ""} title={author.name || author}>{author.name || author}</Link>
                </li>
            {/each}
        </ul>
        <span>{book.title}</span>
        <p class="text-sm text-slate-400 italic mt-1">{book.subtitle || ""}</p>
    </div>
    <ul class="flex flex-wrap gap-1 col-span-2">
        {#each book.subjects?.slice(0, 5) || [] as subject}
            <li class="text-sm p-1 bg-black bg-opacity-10 text-center">#{subject.name}</li>
        {/each}
    </ul>
    <p class="col-span-2">{book.description}</p>
    <ul class="flex flex-wrap gap-2 col-span-2">
        {#if book.featured}
            <Label tag="li" class="!bg-red-500 !bg-opacity-70" name="Featured" />
        {/if}
        {#each book.categories as category}
            <Label tag="li" name={category} />
        {/each}
    </ul>
</Card>
