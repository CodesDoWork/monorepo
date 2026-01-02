<script lang="ts">
    import type { PageData } from "./$types";
    import DirectusImage from "@cdw/monorepo/packages/shared/svelte/components/src/directus-image/DirectusImage.svelte";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { Card } from "../../components/card";
    import { Label } from "../../components/label";
    import { ProjectsList, TechnologiesList } from "../../components/lists";
    import { Personalities } from "../../components/personalities";
    import { Description, H3, H5, Link } from "../../components/texts";
    import { TimeLine } from "../../components/timeline";

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
    } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    const cardClass = "flex-col";

    const AnimationPriority = {
        PortraitMobile: 1,
        Intro: 2,
        PortraitDesktop: 3,
        Experience: 4,
        Personality: 5,
        TechStack: 6,
    } as const;
</script>

<div
    class="
        flex flex-col gap-4
        md:flex-row
    ">
    <DirectusImage
        imgClass="rounded-full"
        class={clsx(
            cardClass,
            `
                -mt-12 block w-24 self-end rounded-full shadow-md
                md:hidden
            `,
        )}
        img={about.portraitMobile}
        style={animationDelay(AnimationPriority.PortraitMobile)} />
    <div class="flex-1 space-y-4">
        <Card class={cardClass} padding style={animationDelay(AnimationPriority.Intro)}>
            <span class="mb-4 font-mono text-slate-400 italic">{about.intro}</span>
            <article class="space-y-2 text-justify hyphens-auto">{@html about.bio}</article>
        </Card>
        <Card class={cardClass} padding style={animationDelay(AnimationPriority.Experience)}>
            <H3 class="mt-0!">{about.experience}</H3>
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
                    <Description lang={currentLanguage.short}>
                        {experience.responsibilities}
                    </Description>
                    <ProjectsList
                        text={`${about.projects}:`}
                        projects={experience.projects}
                        href={p => p.url} />
                    <TechnologiesList
                        text={`${about.coreTechnologies}:`}
                        technologies={experience.technologies} />
                {/snippet}
            </TimeLine>
        </Card>
    </div>
    <div
        class="
            w-full space-y-4
            md:w-64
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
            style={animationDelay(AnimationPriority.PortraitDesktop)}>
            <DirectusImage imgClass="rounded" img={about.portrait} />
        </Card>
        <Card
            class={clsx(cardClass, "overflow-hidden")}
            padding
            style={animationDelay(AnimationPriority.Personality)}>
            <H3 class="mt-0!">{about.personality}</H3>
            <Personalities {disc} {bigFive} {mbti} currentLanguageCode={currentLanguage.code} />
        </Card>
        <Card class={cardClass} padding style={animationDelay(AnimationPriority.TechStack)}>
            <H3 class="mt-0!">{about.techStack}</H3>
            <p
                class="
                    text-slate-600
                    dark:text-slate-400
                ">
                {about.techStackInfo}
            </p>
            {#each Object.entries(techStack) as [stackName, technologies]}
                <H5 class="mt-4">{stackName}</H5>
                <ul class="flex flex-wrap gap-2">
                    {#each technologies as { technology, isMainTechnology }}
                        <li>
                            <Label
                                highlighted={isMainTechnology}
                                class="
                                    text-sm
                                    lg:text-base
                                "
                                icon={technology.icon}
                                name={technology.name} />
                        </li>
                    {/each}
                </ul>
            {/each}
        </Card>
    </div>
</div>
