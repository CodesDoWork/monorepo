<script lang="ts">
    import Page from "../../components/Page.svelte";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Icon from "@iconify/svelte";
    import Link from "../../components/Link.svelte";
    import { calculateTimeAgo, getMonthYear } from "./card-helpers";
    import { clsx } from "clsx";
    import type { PageData } from "./$types";
    import Technology from "../../components/Technology.svelte";
    import { animationDelay } from "../../helpers/animationDelay";
    import { readable } from "svelte/store";
    import { onMount } from "svelte";

    export let data: PageData;
    const { siteInfo, routes } = data;

    const projects = readable([], set => onMount(() => {
        fetch("/api/projects").then(res => res.json()).then(set);
    }));

    const sectionClass = "flex items-center gap-1.5";
</script>

<Page loading={!$projects.length} routes={routes} siteInfo={siteInfo} title={{title: "Projects", small: true}}>
    <div class="mt-12 md:w-4/5 lg:w-full mx-auto">
        {#each $projects as repo, idx (idx)}
            <Card style={animationDelay(idx)} class="mb-6 flex-col lg:flex-row">
                <img src={repo.thumbnail} alt="&nbsp;"
                     class="h-48 lg:h-auto lg:w-80 rounded-t-md lg:rounded-tr-none lg:rounded-l-md object-cover" />
                <div class="p-4 flex flex-col w-full">
                    <Heading commandStyle={false}
                             class="font-bold text-black dark:text-white"
                             level="h3">
                        {repo.name}
                    </Heading>
                    <p class="mb-8">{repo.description || "\xa0"}</p>
                    <div class="flex flex-1 lg:items-end justify-between flex-col lg:flex-row gap-8">
                        <div class="flex gap-3 2xl:gap-10 flex-col 2xl:flex-row items-start 2xl:items-center">
                            <Technology tag="div" technology={repo.language} />
                            <div class={sectionClass}>
                                <span class="text-lg">{repo.stars}</span>
                                <Icon icon="ph:star-fill" class="text-yellow-500 w-5 h-5" />
                            </div>
                            <div class="text-sm">
                                <p>Created {getMonthYear(repo.createdAt)}</p>
                                <p>Updated {calculateTimeAgo(repo.updatedAt)}</p>
                            </div>
                            <div class={clsx(sectionClass, "text-sm")}>
                                <Icon icon="octicon:law-16" class="inline w-6 h-6" />
                                <span>{repo.license || "No license specified"}</span>
                            </div>
                        </div>
                        <div class="place-self-end">
                            {#if repo.homepage}
                                <Link class="mr-4" title="Project Homepage" href={repo.homepage}>Homepage</Link>
                            {/if}
                            <Link title="GitHub" href={repo.url}>View on GitHub</Link>
                        </div>
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</Page>
