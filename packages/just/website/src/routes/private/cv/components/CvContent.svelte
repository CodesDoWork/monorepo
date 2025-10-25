<script lang="ts">
    import type { PageData } from "../$types";
    import Icon from "@iconify/svelte";
    import { z } from "zod";
    import TechnologiesList from "../../../../components/TechnologiesList.svelte";
    import { CvSectionType, CvSectionTypes } from "../lib/types";

    interface Props {
        type: string;
        value: unknown[];
        technologies: PageData["technologies"];
    }

    const { type, value, technologies }: Props = $props();
    let parser: z.ZodTypeAny;
    if (type in CvSectionTypes) {
        parser = CvSectionTypes[type as keyof typeof CvSectionTypes];
    } else {
        throw new Error(`Unknown section type: ${type}`);
    }
    const list = parser.parse(value);
</script>

{#if type === CvSectionType.SimpleList}
    <ul class="ml-4 list-outside list-disc">
        {#each list as item}
            <li class="">{item}</li>
        {/each}
    </ul>
{:else if type === CvSectionType.Languages}
    <ul>
        {#each list as lang}
            <li class="flex items-center gap-2">
                <Icon icon={lang.icon} class="size-3" />
                {lang.name} - {lang.level}
            </li>
        {/each}
    </ul>
{:else if type === CvSectionType.TechStack}
    <TechnologiesList {technologies} />
{:else if type === CvSectionType.ThesisList}
    <ul class="ml-4 list-outside list-disc">
        {#each list as t}
            <li>
                <strong>{t.type}:</strong>
                „{t.title}“ - {t.keywords}
                {#if t.grade}
                    <span class="text-slate-500 dark:text-slate-400"> (Note: {t.grade})</span>
                {/if}
            </li>
        {/each}
    </ul>
{:else if type === CvSectionType.DetailList}
    <ul class="ml-4 list-outside list-disc">
        {#each list as item}
            <li>
                <strong>{item.title}</strong> - {item.details}
            </li>
        {/each}
    </ul>
{/if}
