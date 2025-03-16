<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { onMount } from "svelte";
    import { readable } from "svelte/store";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import Page from "../../components/Page.svelte";
    import Technology from "../../components/Technology.svelte";
    import { animationDelay } from "../../helpers/animationDelay";
    import { calculateTimeAgo, getMonthYear } from "./card-helpers";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    const { siteInfo, routes } = data;

    const projects = readable([], set =>
        onMount(() => {
            fetch("/api/projects")
                .then(res => res.json())
                .then(set);
        }),
    );

    const sectionClass = "flex items-center gap-1.5";
</script>

<Page loading={!$projects.length} {routes} {siteInfo} title={{ title: "Projects", small: true }}>
    <div class="mx-auto mt-12 md:w-4/5 lg:w-full">
        {#each $projects as repo, idx (idx)}
            <Card style={animationDelay(idx)} class="mb-6 flex-col lg:flex-row">
                <img
                    src={repo.thumbnail}
                    alt="&nbsp;"
                    class="h-48 rounded-t-md object-cover lg:h-auto lg:w-80 lg:rounded-l-md lg:rounded-tr-none" />
                <div class="flex w-full flex-col p-4">
                    <Heading
                        commandStyle={false}
                        class="font-bold text-black dark:text-white"
                        level="h3">
                        {repo.name}
                    </Heading>
                    <p class="mb-8">{repo.description || "\xA0"}</p>
                    <div
                        class="flex flex-1 flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <div
                            class="flex flex-col items-start gap-3 2xl:flex-row 2xl:items-center 2xl:gap-10">
                            <Technology tag="div" technology={repo.language} />
                            <div class={sectionClass}>
                                <span class="text-lg">{repo.stars}</span>
                                <Icon icon="ph:star-fill" class="h-5 w-5 text-yellow-500" />
                            </div>
                            <div class="text-sm">
                                <p>Created {getMonthYear(repo.createdAt)}</p>
                                <p>Updated {calculateTimeAgo(repo.updatedAt)}</p>
                            </div>
                            <div class={clsx(sectionClass, "text-sm")}>
                                <Icon icon="octicon:law-16" class="inline h-6 w-6" />
                                <span>{repo.license || "No license specified"}</span>
                            </div>
                        </div>
                        <div class="place-self-end">
                            {#if repo.homepage}
                                <Link class="mr-4" title="Project Homepage" href={repo.homepage}>
                                    Homepage
                                </Link>
                            {/if}
                            <Link title="GitHub" href={repo.url}>View on GitHub</Link>
                        </div>
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</Page>
