<script lang="ts">
    import Card from "../../components/Card.svelte";
    import Label from "../../components/Label.svelte";
    import Link from "../../components/Link.svelte";
    import type { Book } from "../../types/frontend";

    export let book: Book;
    export let style: string | undefined = undefined;
</script>

<Card class="grid h-full grid-cols-[auto_1fr] items-start gap-4 p-2" {style}>
    <Link href={book.url || ""} noStyle title={book.title}>
        <img
            alt="no cover"
            class="max-w-20 rounded sm:max-w-32 md:max-w-48"
            src={typeof book.cover === "string" ? book.cover : book.cover.medium} />
    </Link>
    <div>
        <ul class="mb-1 flex items-center text-sm">
            {#each book.authors || [] as author}
                <li>
                    {#if typeof author === "string"}
                        <Link href={""} title={author}>{author}</Link>
                    {:else}
                        <Link href={author.url} title={author.name}>{author.name}</Link>
                    {/if}
                </li>
            {/each}
        </ul>
        <span>{book.title}</span>
        <p class="mt-1 text-sm italic text-slate-400">{book.subtitle || ""}</p>
    </div>
    <ul class="col-span-2 flex flex-wrap gap-1">
        {#each book.subjects?.slice(0, 5) || [] as subject}
            <li class="bg-black bg-opacity-10 p-1 text-center text-sm">#{subject.name}</li>
        {/each}
    </ul>
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
