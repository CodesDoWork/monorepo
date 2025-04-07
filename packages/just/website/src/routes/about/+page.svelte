<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import Technology from "../../components/Technology.svelte";
    import VerticalLine from "../../components/VerticalLine.svelte";
    import { animationDelay } from "../../shared/animationDelay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { portraitSrc, about, workExperience, techStack } = data;

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);

    const cardClass = "flex-col mb-4";
    const labelClass = "block mt-4 font-bold text-slate-500 dark:text-slate-300 mb-2";
</script>

<div class="flex flex-col gap-4 md:flex-row">
    <img
        alt="Portrait"
        class={clsx(cardClass, "-mt-12 block w-24 self-end rounded-full shadow-md md:hidden")}
        src={portraitSrc}
        style={getCardStyle()} />
    <div class="flex-1">
        <Card class={cardClass} padding style={getCardStyle()}>
            <span class="mb-4 font-mono italic text-slate-400">{about.intro}</span>
            <div class="hyphens-auto text-justify *:mb-2">{@html about.bio}</div>
        </Card>
        <Card class={cardClass} padding style={getCardStyle()}>
            <Heading level="h3">{about.experience}</Heading>
            {#each workExperience as experience, idx (idx)}
                <div
                    class="grid grid-cols-[2.5rem_1fr] grid-rows-[1rem_auto_1fr] sm:grid-cols-[4rem_1fr]">
                    <VerticalLine />
                    <div class="row-span-3 ml-4 mt-2 pb-8">
                        <span class="text-sm italic text-slate-400">
                            {experience.startYear} - {experience.endYear || about.present}
                        </span>
                        <Heading
                            commandStyle={false}
                            class="!text-black dark:!text-white"
                            level="h5">
                            {experience.jobTitle} @
                            <Link href={experience.company.url} title={experience.company.name}>
                                {experience.company.name}
                            </Link>
                        </Heading>
                        <p class="hyphens-auto text-justify text-slate-400">
                            {experience.responsibilities}
                        </p>
                        {#if experience.projects.length}
                            <span class={labelClass}>{about.projects}:</span>
                            <ul class="flex flex-wrap gap-4">
                                {#each experience.projects as { project }}
                                    <Link
                                        noStyle
                                        href={project.url}
                                        title={project.description}
                                        class="group flex w-min min-w-12 flex-col items-center text-center hover:drop-shadow-lg">
                                        <img
                                            class="aspect-square h-8 w-8 rounded-full bg-white object-contain shadow sm:h-12 sm:w-12"
                                            src={project.logo}
                                            alt="logo" />
                                        <span
                                            class="text-sm text-slate-600 transition-colors group-hover:text-[var(--page-color)] dark:text-slate-400">
                                            {project.name}
                                        </span>
                                    </Link>
                                {/each}
                            </ul>
                        {/if}
                        <span class={labelClass}>{about.coreTechnologies}:</span>
                        <ul class="flex flex-wrap gap-2">
                            {#each experience.technologies as { technology }}
                                <Technology tag="li" technology={technology.name} />
                            {/each}
                        </ul>
                    </div>
                    <img
                        alt="Logo"
                        class="aspect-square w-full rounded-full border border-slate-400 object-cover p-0.5"
                        src={experience.company.logo} />
                    <VerticalLine />
                </div>
            {/each}
        </Card>
    </div>
    <div class="w-full md:w-64 lg:w-96">
        <Card class={clsx(cardClass, "hidden md:block")} padding style={getCardStyle()}>
            <img alt="Portrait" class="rounded" src={portraitSrc} />
        </Card>
        <Card class={cardClass} padding style={getCardStyle()}>
            <Heading level="h3">{about.techStack}</Heading>
            {#each Object.entries(techStack) as [stackName, technologies]}
                <Heading class="mt-4" level="h5">{stackName}</Heading>
                <ul class="flex flex-wrap gap-2">
                    {#each technologies as { technology }}
                        <Technology
                            class="text-sm lg:text-base"
                            tag="li"
                            technology={technology.name} />
                    {/each}
                </ul>
            {/each}
        </Card>
    </div>
</div>
