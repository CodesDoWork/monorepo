<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { TechnologiesList } from "../../../components/lists";
    import { CvSectionType, CvSectionTypes } from "./types";

    interface Props {
        type: string;
        value: unknown[];
        technologies: PageData["technologies"];
    }

    const { type, value, technologies }: Props = $props();
</script>

{#if type === CvSectionType.SimpleList}
    <ul class="ml-4 list-outside list-disc">
        {#each CvSectionTypes[type].parse(value) as item}
            <li class="">{item}</li>
        {/each}
    </ul>
{:else if type === CvSectionType.Languages}
    <ul>
        {#each CvSectionTypes[type].parse(value) as lang}
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
        {#each CvSectionTypes[type].parse(value) as t}
            <li>
                <strong>{t.type}:</strong>
                „{t.title}“ - {t.keywords}
                {#if t.grade}
                    <span
                        class="
                            text-slate-500
                            dark:text-slate-400
                        ">
                        (Note: {t.grade})</span>
                {/if}
            </li>
        {/each}
    </ul>
{:else if type === CvSectionType.DetailList}
    <ul class="ml-4 list-outside list-disc">
        {#each CvSectionTypes[type].parse(value) as item}
            <li>
                <strong>{item.title}</strong> - {item.details}
            </li>
        {/each}
    </ul>
{/if}
