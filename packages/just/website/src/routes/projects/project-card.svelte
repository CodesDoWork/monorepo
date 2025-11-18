<script lang="ts">
    import type { ProjectTextsFragment } from "../../graphql/default/generated/graphql";
    import type { Project } from "./types";
    import Icon from "@iconify/svelte";
    import clsx from "clsx";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Label from "../../components/Label.svelte";
    import Link from "../../components/Link.svelte";

    interface Props {
        project: Project;
        texts: ProjectTextsFragment;
        style?: string;
        class?: string;
    }

    const { project, texts, style, class: className }: Props = $props();
</script>

<Card id={`_${project.id}`} {style} class={clsx(className, "flex flex-col lg:flex-row")}>
    <img
        src={project.thumbnail}
        loading="lazy"
        alt="project thumbnail"
        class="h-48 rounded-t-md object-cover lg:h-auto lg:w-80 lg:rounded-l-md lg:rounded-tr-none" />
    <div class="flex w-full flex-col p-4">
        <Heading commandStyle={false} class="font-bold text-black dark:text-white" level="h3">
            {project.name}
        </Heading>
        <p class="mb-8 max-w-prose">{project.description || "\xA0"}</p>
        <div class="flex flex-1 flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div
                class="flex flex-col flex-wrap items-start gap-3 2xl:flex-row 2xl:items-center 2xl:gap-6">
                <div class="flex items-center gap-1.5 text-sm">
                    <Icon icon="octicon:law-16" class="inline size-6" />
                    <span>{project.license || texts.noLicense}</span>
                </div>
                <ul class="flex gap-2 flex-wrap">
                    {#each project.technologies as { technology }}
                        <li>
                            <Label tag="div" name={technology.name} icon={technology.icon} />
                        </li>
                    {/each}
                </ul>
            </div>
            <div
                class="place-self-end flex flex-col xl:flex-row items-end xl:items-start min-w-fit">
                {#if project.homepage}
                    <Link
                        class="mr-0 w-fit xl:mr-4"
                        title="Project Homepage"
                        href={project.homepage}>
                        {texts.homepage}
                    </Link>
                {/if}
                <Link title="GitHub" href={project.githubUrl}>{texts.viewOnGitHub}</Link>
            </div>
        </div>
    </div>
</Card>
