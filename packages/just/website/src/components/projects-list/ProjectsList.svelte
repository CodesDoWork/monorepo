<script lang="ts" generics="T extends Project">
    import Link from "../Link.svelte";
    import ListWithHeading from "../ListWithHeading.svelte";
    import type { Project } from "./types";

    interface Props {
        text: string;
        projects: T[];
        href?: string | ((project: T) => string);
        onclick?: (project: T) => void;
    }

    const { text, projects, onclick, href = "" }: Props = $props();
</script>

<ListWithHeading {text} items={projects}>
    {#snippet display(project)}
        <Link
            noStyle
            href={typeof href === "string" ? href : href(project)}
            title={project.description}
            onclick={onclick ? () => onclick(project) : undefined}
            class="group flex w-min min-w-24 flex-col items-center text-center hover:drop-shadow">
            <img
                class="aspect-square h-8 w-8 rounded-full bg-white object-contain shadow sm:h-12 sm:w-12"
                src={project.logo}
                alt="logo" />
            <span
                class="text-sm text-slate-600 transition-colors group-hover:text-[var(--page-color)] dark:text-slate-400">
                {project.name}
            </span>
        </Link>
    {/snippet}
</ListWithHeading>
