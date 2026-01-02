<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { smoothScrollTo } from "@cdw/monorepo/shared-utils/html/client";
    import { clsx } from "clsx";
    import ProjectCard from "./ProjectCard.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { projects, texts, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    $effect(() => {
        if (window.location.hash) {
            setTimeout(() => smoothScrollTo(window.location.hash), 0);
        }
    });
</script>

<div
    class="
        mx-auto mt-12
        md:w-4/5
        lg:w-full
    ">
    {#each projects as project, projectIdx (projectIdx)}
        <ProjectCard
            style={animationDelay(projectIdx + 1)}
            {project}
            {texts}
            class={clsx(project.children?.length ? "mb-3" : "mb-6")} />
        {#each project.children as child, childIdx (childIdx)}
            <ProjectCard
                style={animationDelay(projectIdx + childIdx + 2)}
                project={child}
                {texts}
                class={clsx(childIdx < project.children.length - 1 ? "mb-3" : "mb-6", "ml-6")} />
        {/each}
    {/each}
</div>
