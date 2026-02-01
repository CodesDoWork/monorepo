<script lang="ts">
    import type { PageData } from "./$types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import JobPosting from "../../components/career/JobPosting.svelte";
    import { WidthBox } from "../../components/content-area";
    import { H1, H2, H4 } from "../../components/heading";
    import { Paragraphs } from "../../components/text";
    import {
        aHoverAnimation,
        colorPrimaryClass,
        fadeIn,
        fadeInBottom,
    } from "../../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { career, careerBenefits, jobPostings, jsonldThings } = $derived(data);

    $effect(() => addJsonLdThings(jsonldThings));
</script>

<WidthBox class="isolate">
    <H1 class={fadeIn}>{career.title}</H1>
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
                class={clsx(
                    fadeInBottom,
                    colorPrimaryClass,
                    `
                        hover:text-primary-900
                        dark:hover:text-primary-300
                        w-fit origin-left transition-all
                        hover:scale-103
                    `,
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
            fadeInBottom,
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
        <H2 class={fadeIn} style={animationDelay(4)}>{career.jobPostingsTitle}</H2>
        <ul
            class="
                mt-8 grid grid-cols-1 gap-8 px-2
                sm:px-8
                md:grid-cols-2
                lg:gap-12
            ">
            {#each jobPostings as jobPosting, idx (idx)}
                <JobPosting {...jobPosting} animationDelay={5 + idx} />
            {/each}
        </ul>
    </section>
    <div
        style={animationDelay(6)}
        class={clsx(
            fadeInBottom,
            `
                bg-primary-100
                dark:bg-primary-900
                mx-2 mt-16 rounded-md px-6 py-4 shadow-md
                sm:mx-8
            `,
        )}>
        {@html career.cta}
    </div>
</WidthBox>
