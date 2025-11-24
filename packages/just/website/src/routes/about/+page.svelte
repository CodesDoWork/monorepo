<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import Card from "../../components/Card.svelte";
    import Description from "../../components/Description.svelte";
    import Heading from "../../components/Heading.svelte";
    import Label from "../../components/Label.svelte";
    import Link from "../../components/Link.svelte";
    import { ProjectsList } from "../../components/projects-list";
    import TechnologiesList from "../../components/TechnologiesList.svelte";
    import TimeLine from "../../components/TimeLine.svelte";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { animationDelay } from "../../shared/animationDelay";
    import Personalities from "./components/Personalities.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const {
        about,
        workExperiences,
        techStack,
        disc,
        bigFive,
        mbti,
        currentLanguage,
        jsonLdThings,
    } = data;
    addJsonLdThings(jsonLdThings);

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);

    const cardClass = "flex-col";
</script>

<svelte:head>
    <style>
        #simple-translate {
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
            width: auto !important;
            height: auto !important;
        }
    </style>
</svelte:head>

<div
    class="
        flex flex-col gap-4
        md:flex-row
    ">
    <img
        loading="lazy"
        alt="Portrait"
        class={clsx(
            cardClass,
            `
                -mt-12 block w-24 self-end rounded-full shadow-md
                md:hidden
            `,
        )}
        src={about.portrait}
        style={getCardStyle()} />
    <div class="flex-1 space-y-4">
        <Card tag="section" class={cardClass} padding style={getCardStyle()}>
            <span class="mb-4 font-mono text-slate-400 italic">{about.intro}</span>
            <article class="space-y-2 text-justify hyphens-auto">{@html about.bio}</article>
        </Card>
        <Card class={cardClass} padding style={getCardStyle()}>
            <Heading level="h3">{about.experience}</Heading>

            <TimeLine steps={workExperiences} logo={experience => experience.company.logo}>
                {#snippet date(experience)}
                    {experience.startYear} - {experience.endYear || about.present}
                {/snippet}
                {#snippet title(experience)}
                    {experience.jobTitle} @
                    <Link href={experience.company.url} title={experience.company.name}>
                        {experience.company.name}
                    </Link>
                {/snippet}
                {#snippet content(experience)}
                    <Description>{experience.responsibilities}</Description>
                    <ProjectsList text={`${about.projects}:`} projects={experience.projects} />
                    <TechnologiesList
                        text={`${about.coreTechnologies}:`}
                        technologies={experience.technologies} />
                {/snippet}
            </TimeLine>
        </Card>
    </div>
    <div
        class="
            -mt-4 w-full space-y-4
            md:mt-0 md:w-64
            lg:w-96
        ">
        <Card
            class={clsx(
                cardClass,
                `
                    hidden
                    md:block
                `,
            )}
            padding
            style={getCardStyle()}>
            <img loading="lazy" alt="Portrait" class="rounded" src={about.portrait} />
        </Card>
        <Card class={clsx(cardClass, "overflow-hidden")} padding style={getCardStyle()}>
            <Heading level="h3">{about.personality}</Heading>
            <Personalities {disc} {bigFive} {mbti} {currentLanguage} />
        </Card>
        <Card class={cardClass} padding style={getCardStyle()}>
            <Heading level="h3">{about.techStack}</Heading>
            <p
                class="
                    text-slate-600
                    dark:text-slate-400
                ">
                <i>{about.techStackInfo}</i>
            </p>
            {#each Object.entries(techStack) as [stackName, technologies]}
                <Heading class="mt-4" level="h5">{stackName}</Heading>
                <ul class="flex flex-wrap gap-2">
                    {#each technologies as { technology, isMainTechnology }}
                        <Label
                            highlighted={isMainTechnology}
                            class="
                                text-sm
                                lg:text-base
                            "
                            tag="li"
                            icon={technology.icon}
                            name={technology.name} />
                    {/each}
                </ul>
            {/each}
        </Card>
    </div>
</div>
