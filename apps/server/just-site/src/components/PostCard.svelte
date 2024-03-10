<script lang="ts">
    import Heading from "./Heading.svelte";
    import Link from "./Link.svelte";
    import Card from "./Card.svelte";
    import type { PostOrPage } from "@tryghost/content-api";
    import Label from "./Label.svelte";

    export let style = "";
    export let post: PostOrPage;
</script>

<Card style={style}>
    <Link class="flex-1 grid grid-cols-1 sm:grid-cols-[16rem_auto] lg:grid-cols-1 xl:grid-cols-[16rem_auto] items-stretch gap-2 !font-sans"
          href={post.url}
          noStyle
          title={post.title}>
        <img alt="Cover" class="w-full object-cover rounded-b-none rounded-t-lg sm:rounded-r-none sm:rounded-l-lg lg:rounded-b-none lg:rounded-t-lg xl:rounded-r-none xl:rounded-l-lg" src={post.feature_image} />
        <div class="p-2 pr-2 sm:pr-4 lg:pr-2 xl:pr-4 grid grid-cols-[auto_min-content]">
            <Heading class="col-span-2" commandStyle={false} level="h3">{post.title}</Heading>
            <p class="col-span-2">{post.excerpt}</p>
            <ul class="col-span-2 flex flex-wrap my-2">
                {#each post.tags as tag}
                    <Label tag="li" name={tag.name} />
                {/each}
            </ul>
            <span class="text-slate-400 dark:text-slate-300">A {Math.max(1, post.reading_time)} min read</span>
            <span class="text-slate-400 dark:text-slate-300">{new Date(post.published_at).toLocaleDateString()}</span>
        </div>
    </Link>
</Card>
