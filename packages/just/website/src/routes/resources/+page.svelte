<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import { animationDelay } from "../../shared/animationDelay";
    import { addJsonLdThings } from "../../contexts/jsonld";

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
<ul class="mt-8">
    {#each sections as section}
        <li>
            <Card padding style={getCardStyle()} class="flex-col">
                <Heading level="h2">{section.title}</Heading>
                {#if section.description}
                    <p class="mb-4">{section.description}</p>
                {/if}
                <ul>
                    {#each section.items as item}
                        <li class="mb-3">
                            <a
                                href={item.file}
                                download={item.filename}
                                target="_blank"
                                class="rounded-md p-4 grid grid-cols-[auto_1fr] gap-x-4 bg-white dark:bg-black/20 shadow hover:shadow-md dark:hover:bg-black/30 hover:bg-slate-50 transition items-center">
                                <div class="row-span-2">
                                    <Icon icon="mdi-light:file" class="size-12" />
                                </div>
                                <Heading level="h4" commandStyle={false} class="cursor-pointer">
                                    {item.title}
                                </Heading>
                                {#if item.description}
                                    <p class="max-w-prose">{item.description}</p>
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            </Card>
        </li>
    {/each}
</ul>
