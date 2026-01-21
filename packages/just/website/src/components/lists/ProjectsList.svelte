<script lang="ts" generics="T extends Project">
    import type { Project } from "./types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { ListWithHeading } from ".";
    import { Link } from "../texts";

    interface Props {
        text: string;
        projects: T[];
        href?: string | ((project: T) => string);
    }

    const { text, projects, href = "" }: Props = $props();
</script>

<ListWithHeading {text} items={projects}>
    {#snippet display(project)}
        <Link
            noStyle
            href={typeof href === "string" ? href : href(project)}
            title={project.description}
            class="
                group flex w-min min-w-24 flex-col items-center text-center
                hover:drop-shadow-sm
            ">
            <DirectusImage
                img={project.logo}
                imgClass="object-contain! rounded-full"
                class="
                    size-8 rounded-full bg-white shadow-sm
                    sm:size-12
                " />
            <span
                class="
                    group-hover:text-pageColor
                    dark:group-hover:text-pageColor
                    text-sm text-slate-600 transition-colors
                    dark:text-slate-400
                ">
                {project.name}
            </span>
        </Link>
    {/snippet}
</ListWithHeading>
