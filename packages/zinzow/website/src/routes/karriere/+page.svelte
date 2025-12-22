<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import JobPosting from "../../components/career/JobPosting.svelte";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1, H2, H4 } from "../../components/heading";
    import { Paragraphs } from "../../components/text";
    import { animationDelay, fadeIn, fadeInBottom } from "../../lib/client/animate";
    import { aHoverAnimation } from "../../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { career, careerBenefits, jobPostings } = $derived(data);
</script>

<WidthBox class="isolate">
    <H1 class={fadeIn()}>{career.title}</H1>
    <Paragraphs text={career.intro} animationDelay={1} />
    <ul
        class="
            mx-auto mt-4 grid w-fit list-outside list-disc
            sm:mt-12 sm:grid-cols-2
            md:mt-16 md:gap-4
            lg:gap-8
        ">
        {#each careerBenefits as benefit, idx (idx)}
            <li
                class={fadeInBottom(
                    clsx(`
                        text-primary w-fit origin-left transition-all
                        hover:text-primary-900 hover:scale-104
                        dark:hover:text-primary-400
                    `),
                )}
                style={animationDelay(2 + idx)}>
                <H4 class={clsx(aHoverAnimation, `relative m-0! inline-block cursor-default`)}>
                    {benefit.title}
                </H4>
            </li>
        {/each}
    </ul>
    <DirectusImage
        img={career.teamPhoto}
        imgClass="rounded-lg shadow-lg"
        style={animationDelay(3)}
        class={clsx(
            fadeInBottom(),
            `
                mx-auto mt-16 aspect-2/1 w-full
                sm:mt-24
                md:w-3/4
            `,
        )} />
    <section
        class="
            mt-16
            sm:mt-24
        ">
        <H2 class={fadeIn()} style={animationDelay(4)}>{career.jobPostingsTitle}</H2>
        <ul
            class="
                grid gap-12 px-8
                md:grid-cols-2
            ">
            {#each jobPostings as jobPosting, idx (idx)}
                <JobPosting {...jobPosting} animationDelay={5 + idx} />
            {/each}
        </ul>
    </section>
    <div
        style={animationDelay(6)}
        class={clsx(
            fadeInBottom(),
            `
                bg-primary-100 mx-8 mt-16 rounded-md px-6 py-4 shadow-md
                dark:bg-primary-900
            `,
        )}>
        {@html career.cta}
    </div>
</WidthBox>
