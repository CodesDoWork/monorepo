<script lang="ts">
    import Page from "../../components/Page.svelte";
    import Card from "../../components/Card.svelte";
    import type { Project } from "../../types/Project";
    import Heading from "../../components/Heading.svelte";
    import Icon from "@iconify/svelte";
    import Link from "../../components/Link.svelte";
    import { calculateTimeAgo, getMonthYear } from "./card-helpers";
    import { clsx } from "clsx";

    export let data;
    const repos: Project[] = data.repos;

    const sectionClass = "flex items-center gap-1.5";
</script>

<Page title={{title: "Projects", small: true}}>
    <div class="mt-12 md:w-4/5 lg:w-full mx-auto">
        {#each repos as repo, idx (idx)}
            <Card style={`animation-delay: ${idx * 0.1}s;`} class="mb-6 flex-col lg:flex-row">
                <img src={repo.thumbnail} alt="&nbsp;" class="h-48 lg:h-auto lg:w-80 rounded-t-md lg:rounded-tr-none lg:rounded-l-md object-cover" />
                <div class="p-4 flex flex-col w-full">
                    <Heading commandStyle={false}
                             class="font-bold text-black dark:text-white"
                             level="h3">
                        {repo.name}
                    </Heading>
                    <p class="mb-8">{repo.description || "\xa0"}</p>
                    <div class="flex flex-1 lg:items-end justify-between flex-col lg:flex-row gap-8">
                        <div class="flex gap-3 2xl:gap-10 flex-col 2xl:flex-row">
                            <div class={sectionClass}>
                                <span>{repo.language}</span>
                                <Icon icon={`devicon:${repo.language.replace("#", "sharp").toLowerCase()}`}
                                      class="inline w-6 h-6" />
                            </div>
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
                                <Link class="mr-4" external title="Project Homepage" href={repo.homepage}>Homepage</Link>
                            {/if}
                            <Link external title="GitHub" href={repo.url}>View on GitHub</Link>
                        </div>
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</Page>
