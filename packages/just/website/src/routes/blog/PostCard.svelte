<script lang="ts">
    import type { JustSiteBlogEntriesDto } from "../../types/dtos";
    import type { Locale } from "../../types/locale";
    import { browser } from "$app/environment";
    import { format } from "date-fns";
    import * as locales from "date-fns/locale";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Label from "../../components/Label.svelte";
    import Link from "../../components/Link.svelte";

    export let style = "";
    export let post: JustSiteBlogEntriesDto;

    let lang: Locale = "enUS";
    browser && (lang = (window?.navigator?.language?.replace("-", "") || lang) as Locale);
</script>

<Card class="p-1" {style}>
    <Link
        class="grid flex-1 grid-cols-1 items-stretch gap-2 !font-sans sm:grid-cols-[16rem_auto] lg:grid-cols-1 xl:grid-cols-[16rem_auto]"
        href={`/blog/${post.slug}`}
        noStyle
        title={post.title}>
        <img
            alt="Cover"
            class="w-full rounded-b-none rounded-t-lg object-cover sm:rounded-l-lg sm:rounded-r-none lg:rounded-b-none lg:rounded-t-lg xl:rounded-l-lg xl:rounded-r-none"
            src={post.cover} />
        <div class="grid grid-cols-[auto_min-content] p-2 pr-2 sm:pr-4 lg:pr-2 xl:pr-4">
            <div class="flex items-start justify-between">
                <Heading class="col-span-2 cursor-pointer" commandStyle={false} level="h3"
                >{post.title}</Heading>
                {#if post.featured}
                    <Label
                        tag="span"
                        name="Featured"
                        class="!bg-red-400 !bg-opacity-70 dark:text-black" />
                {/if}
            </div>
            <p class="col-span-2">{post.excerpt}</p>
            <span class="text-slate-400 dark:text-slate-300"
            >{format(new Date(post.date_created), "P", {
                locale: locales[lang],
            })}</span>
        </div>
    </Link>
</Card>
