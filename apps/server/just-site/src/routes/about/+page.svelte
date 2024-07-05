<script lang="ts">
    import Page from "../../components/Page.svelte";
    import type { PageData } from "./$types";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Technology from "../../components/Technology.svelte";
    import Link from "../../components/Link.svelte";
    import VerticalLine from "../../components/VerticalLine.svelte";
    import { clsx } from "clsx";
    import { animationDelay } from "../../helpers/animationDelay";

    export let data: PageData;
    const { siteInfo, routes, portraitSrc, workExperience } = data;

    let animationIdx = 0;
    const getCardStyle = () => animationDelay(animationIdx++);

    const cardClass = "flex-col mb-4";
    const labelClass = "block mt-4 font-bold text-slate-500 dark:text-slate-300 mb-2";
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: "About", small: true}}>
    <div class="flex gap-4 flex-col md:flex-row">
        <img alt="Portrait" class={clsx(cardClass, "block md:hidden rounded-full self-end mt-[-3rem] w-24 shadow-md")} src={portraitSrc} style={getCardStyle()} />
        <div class="flex-1">
            <Card class={cardClass} padding style={getCardStyle()}>
                <span class="font-mono italic text-slate-400 mb-6">{siteInfo.about_intro}</span>
                <div class="mb-4 md:text-justify">{@html siteInfo.about_bio}</div>
            </Card>
            <Card class={cardClass} padding style={getCardStyle()}>
                <Heading level="h3">Experience</Heading>
                {#each workExperience as experience, idx (idx)}
                    <div class="grid grid-cols-[4rem_1fr] grid-rows-[1rem_auto_1fr]">
                        <VerticalLine />
                        <div class="ml-4 mt-2 pb-8 row-span-3">
                            <span class="text-sm italic text-slate-400">{experience.start_year} - {experience.end_year || "present"}</span>
                            <Heading commandStyle={false}
                                     class="!text-black dark:!text-white"
                                     level="h5">{experience.job_title} @
                                <Link href={experience.company.url}
                                      title={experience.company.name}>{experience.company.name}</Link>
                            </Heading>
                            <p class="text-slate-400">{experience.responsibilities}</p>
                            <span class={labelClass}>Projects:</span>
                            <ul class="flex gap-4 flex-wrap">
                                {#each experience.projects as project}
                                    <Link noStyle
                                          href={project.link}
                                          title={project.description}
                                          class="flex w-min items-center text-center flex-col group hover:drop-shadow-lg">
                                        <img class="w-12 h-12 object-contain rounded-full bg-white shadow"
                                             src={project.logo}
                                             alt="logo" />
                                        <span class="text-sm text-slate-600 dark:text-slate-400 group-hover:text-[var(--page-color)] transition-colors">{project.name}</span>
                                    </Link>

                                {/each}
                            </ul>
                            <span class={labelClass}>Core Technologies:</span>
                            <ul class="flex gap-2 flex-wrap">
                                {#each experience.technologies as technology}
                                    <Technology tag="li" technology={technology} />
                                {/each}
                            </ul>
                        </div>
                        <img alt="Logo"
                             class="rounded-full w-full aspect-square object-cover border border-slate-400 p-0.5"
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
                <Heading level="h3">Tech Stack</Heading>
                {#each Object.entries(siteInfo.technologies) as techStack}
                    <Heading class="mt-4" level="h5">{techStack[0]}</Heading>
                    <ul class="flex gap-2 flex-wrap">
                        {#each techStack[1] as technology}
                            <Technology class="text-sm lg:text-base" tag="li" technology={technology} />
                        {/each}
                    </ul>
                {/each}
            </Card>
        </div>
    </div>
</Page>
