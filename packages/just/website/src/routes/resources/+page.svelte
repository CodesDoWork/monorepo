<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { animationDelay } from "../../shared/animationDelay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { resources, sections, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);
</script>

<p class="italic">{resources.info}</p>
<ul class="mt-8 space-y-4">
    {#each sections as section}
        <li>
            <Card padding style={getCardStyle()} class="flex-col">
                <Heading level="h2">{section.title}</Heading>
                {#if section.description}
                    <div class="mb-4">{@html section.description}</div>
                {/if}
                <ul>
                    {#each section.items as item}
                        <li class="mb-3">
                            <a
                                href={item.file}
                                download={item.filename}
                                target="_blank"
                                class="
                                    grid grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-md
                                    bg-white p-4 shadow transition
                                    hover:bg-slate-50 hover:shadow-md
                                    dark:bg-black/20 dark:hover:bg-black/30
                                ">
                                <div class="row-span-2">
                                    <Icon icon="mdi-light:file" class="size-12" />
                                </div>
                                <Heading
                                    level="h4"
                                    commandStyle={false}
                                    class="col-span-2 cursor-pointer">
                                    {item.title}
                                </Heading>
                                {#if item.description}
                                    <p class="max-w-prose">{item.description}</p>
                                {/if}
                                {#if item.doi}
                                    <Link
                                        class="col-start-3 w-fit"
                                        title="Project Homepage"
                                        href={`https://doi.org/${item.doi}`}>
                                        DOI: {item.doi}
                                    </Link>
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            </Card>
        </li>
    {/each}
</ul>
