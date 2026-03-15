<script lang="ts">
    import type { PageData } from "./$types";
    import type { Project } from "./types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { smoothScrollTo } from "@cdw/monorepo/shared-utils/html/client";
    import { clsx } from "clsx";
    import ProjectCard from "./ProjectCard.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { jsonLdThings, projects, texts } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    $effect(() => {
        if (window.location.hash) {
            setTimeout(() => smoothScrollTo(window.location.hash), 0);
        }
    });

    const bottomMargins: Record<number, string> = {
        0: "mb-8",
        1: "mb-4 last:mb-8",
        2: "mb-2 last:mb-4 ",
    };

    const leftMargins: Record<number, string> = {
        0: "ml-0",
        1: "ml-4",
        2: "ml-10",
    };
</script>

{#snippet displayProject(project: Project, delay: number = 0, level: number = 0)}
    <li
        class={clsx(
            leftMargins[level],
            project.children?.length ? bottomMargins[level + 1] : bottomMargins[level],
        )}>
        <ProjectCard style={animationDelay(delay + 1)} {project} {texts} />
    </li>
    {#if project.children?.length}
        <ul>
            {#each project.children as child, childIdx (childIdx)}
                {@render displayProject(child, delay + childIdx + 2, level + 1)}
            {/each}
        </ul>
    {/if}
{/snippet}

<ul
    class="
        mx-auto mt-12
        md:w-4/5
        lg:w-full
    ">
    {#each projects as project, projectIdx (projectIdx)}
        {@render displayProject(project, projectIdx + 1)}
    {/each}
</ul>
