<script lang="ts">
    import type { ProjectTextsFragment } from "../../graphql/default/generated/graphql";
    import type { Project } from "./types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { normalizeAnchor } from "@cdw/monorepo/shared-utils/html/common";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Card } from "../../components/card";
    import { Label } from "../../components/label";
    import { H3, Link, P } from "../../components/texts";

    interface Props {
        project: Project;
        texts: ProjectTextsFragment;
        style?: string;
        class?: string;
    }

    const { project, texts, style, class: className }: Props = $props();
</script>

<Card
    id={normalizeAnchor(project.name)}
    {style}
    class={clsx(
        className,
        `
            flex flex-col
            lg:flex-row
        `,
    )}>
    <DirectusImage
        img={project.thumbnail}
        imgClass={clsx(
            `
                rounded-t-md
                lg:rounded-l-md lg:rounded-tr-none
            `,
            project.thumbnail.height >= project.thumbnail.width && "object-contain!",
        )}
        class="
            h-48
            lg:h-auto lg:max-h-80 lg:w-80 lg:min-w-80
        " />
    <div class="flex w-full flex-col p-4">
        <H3 commandStyle={false} class="mt-0!">
            {project.name}
        </H3>
        <P class="mb-8 max-w-prose">{project.description || "\xA0"}</P>
        <div
            class="
                flex flex-1 flex-col justify-between gap-8
                lg:flex-row lg:items-end
            ">
            <div
                class="
                    flex flex-col flex-wrap items-start gap-3
                    2xl:flex-row 2xl:items-center 2xl:gap-6
                ">
                <div class="flex items-center gap-1.5 text-sm">
                    <Icon icon="octicon:law-16" class="inline size-6" />
                    <span>{project.license || texts.noLicense}</span>
                </div>
                <ul class="flex flex-wrap gap-2">
                    {#each project.technologies as { technology }}
                        <li>
                            <Label name={technology.name} icon={technology.icon} />
                        </li>
                    {/each}
                </ul>
            </div>
            <div
                class="
                    flex min-w-fit flex-col items-end place-self-end
                    xl:flex-row xl:items-start
                ">
                {#if project.homepage}
                    <Link
                        class="
                            mr-0 w-fit
                            xl:mr-4
                        "
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
