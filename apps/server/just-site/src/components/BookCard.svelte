<script lang="ts">
    import { clsx } from "clsx";
    import Card from "./Card.svelte";
    import Link from "./Link.svelte";
    import Icon from "@iconify/svelte";
    import { type Book } from "../types/Book";

    export let book: Book;
    export let style = undefined;

    const labelClass = "bg-black bg-opacity-10 p-2 rounded";
</script>

<Card class="p-2 grid grid-cols-[auto_1fr] gap-4 items-start h-full" style={style}>
    <Link href={book.url} noStyle title={book.title}>
        <img alt="no cover" class="rounded max-w-20 sm:max-w-32 md:max-w-48" src={book.cover?.medium} />
    </Link>
    <div>
        <ul class="flex items-center mb-1 text-sm">
            {#each book.authors || [] as author}
                <li>
                    <Link href={author.url} title={author.name}>{author.name}</Link>
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
    <div class="flex items-center gap-1 col-span-2">
        <span>My Rating: {book.rating}/5</span>
        <Icon class="text-yellow-500 w-5 h-5" icon="ph:star-fill" />
    </div>
    <ul class="flex flex-wrap gap-2 col-span-2">
        {#if book.featured}
            <li class={clsx(labelClass, "!bg-red-500 !bg-opacity-70")}>Featured</li>
        {/if}
        {#each book.categories as category}
            <li class={labelClass}>{category}</li>
        {/each}
    </ul>
</Card>
