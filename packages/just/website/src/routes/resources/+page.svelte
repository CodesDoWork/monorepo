<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import Icon from "@iconify/svelte";
    import { Card } from "../../components/card";
    import { H2, H4, Link, P } from "../../components/texts";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { resources, sections, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));
</script>

<P>{resources.info}</P>
<ul class="mt-8 space-y-4">
    {#each sections as section, idx (idx)}
        <li>
            <Card padding style={animationDelay(idx + 1)} class="flex-col">
                <H2 class="mt-0!">{section.title}</H2>
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
                                <H4 commandStyle={false} class="col-span-2 mt-0! cursor-pointer">
                                    {item.title}
                                </H4>
                                {#if item.description}
                                    <P class="max-w-prose">{item.description}</P>
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
