<script lang="ts">
    import type { Book } from "./types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { Card } from "../../components/card";
    import { Label } from "../../components/label";
    import { H5, P } from "../../components/texts";

    interface Props {
        book: Book;
        style: string | undefined;
        featuredText: string;
    }

    const { book, style, featuredText }: Props = $props();
</script>

<Card class="grid h-full grid-cols-[33%_67%] items-start gap-4 p-2 pr-6" {style}>
    <DirectusImage imgClass="rounded" class="max-w-full" img={book.cover} />
    <div>
        <H5 class="mt-0!" commandStyle={false}>{book.title}</H5>
        <ul class="items-center text-sm">
            {#each book.authors as author}
                <li>{author}</li>
            {/each}
        </ul>
    </div>
    <P class="col-span-2">{book.description}</P>
    <ul class="col-span-2 flex flex-wrap gap-2">
        {#if book.featured}
            <li>
                <Label class="bg-red-500/70!" name={featuredText} />
            </li>
        {/if}
        {#each book.categories as category}
            <li>
                <Label name={category} />
            </li>
        {/each}
    </ul>
</Card>
