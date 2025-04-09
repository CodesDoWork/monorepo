<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { ProjectsList } from "../../components/projects-list";
    import TechnologiesList from "../../components/TechnologiesList.svelte";
    import Technology from "../../components/Technology.svelte";
    import TimeLine from "../../components/TimeLine.svelte";
    import { animationDelay } from "../../shared/animationDelay";
    import Description from "../../components/Description.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { portraitSrc, about, workExperiences, techStack } = data;

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);

    const cardClass = "flex-col mb-4";
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
