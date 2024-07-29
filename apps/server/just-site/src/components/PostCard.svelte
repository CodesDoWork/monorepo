<script lang="ts">
    import Heading from "./Heading.svelte";
    import Link from "./Link.svelte";
    import Card from "./Card.svelte";
    import type { JustSiteBlogEntries } from "../types/directus";
    import Label from "./Label.svelte";

    export let style = "";
    export let post: JustSiteBlogEntries;
</script>

<Card style={style}>
    <Link
        class="flex-1 grid grid-cols-1 sm:grid-cols-[16rem_auto] lg:grid-cols-1 xl:grid-cols-[16rem_auto] items-stretch gap-2 !font-sans"
        href={`/blog/${post.slug}`}
        noStyle
        title={post.title}>
        <img alt="Cover"
             class="w-full object-cover rounded-b-none rounded-t-lg sm:rounded-r-none sm:rounded-l-lg lg:rounded-b-none lg:rounded-t-lg xl:rounded-r-none xl:rounded-l-lg"
             src={post.cover} />
        <div class="p-2 pr-2 sm:pr-4 lg:pr-2 xl:pr-4 grid grid-cols-[auto_min-content]">
            <div class="flex justify-between items-start">
                <Heading class="col-span-2 cursor-pointer" commandStyle={false} level="h3">{post.title}</Heading>
                { #if post.featured }
                    <Label tag="span" name="Featured" class="!bg-red-400 !bg-opacity-70 dark:text-black" />
                {/if}
            </div>
            <p class="col-span-2">{post.excerpt}</p>
            <span class="text-slate-400 dark:text-slate-300">{new Date(post.date_created).toLocaleDateString()}</span>
        </div>
    </Link>
</Card>
