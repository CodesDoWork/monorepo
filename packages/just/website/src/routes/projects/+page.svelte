<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { animationDelay } from "../../shared/animationDelay";
    import { smoothScrollTo } from "../../shared/smoothScroll";
    import ProjectCard from "./project-card.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { projects, texts, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);

    if (window.location.hash) {
        setTimeout(() => smoothScrollTo(window.location.hash), 800);
    }

    let currentCard = 0;
</script>

<div
    class="
        mx-auto mt-12
        md:w-4/5
        lg:w-full
    ">
    {#each projects as project}
        <ProjectCard
            style={animationDelay(++currentCard)}
            {project}
            {texts}
            class={clsx(project.children?.length ? "mb-3" : "mb-6")} />
        {#each project.children as child, childIdx (childIdx)}
            <ProjectCard
                style={animationDelay(++currentCard)}
                project={child}
                {texts}
                class={clsx(childIdx < project.children.length - 1 ? "mb-3" : "mb-6", "ml-6")} />
        {/each}
    {/each}
</div>
