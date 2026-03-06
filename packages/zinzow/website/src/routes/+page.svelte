<script lang="ts">
    import type { PageData } from "./$types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { preloadImages } from "@cdw/monorepo/shared-svelte-utils";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { fly } from "svelte/transition";
    import { aHoverAnimation, fadeInBottom } from "../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    // svelte-ignore state_referenced_locally
    // because server side data only loaded once
    const { landscapeHeros, portraitHeros, imageCycleTimeMs, intro } = data;

    let currentLandscapeHeroImageIdx = $state(0);
    const nextLandscapeHeroImageIdx = $derived(
        (currentLandscapeHeroImageIdx + 1) % landscapeHeros.length,
    );
    let currentPortraitHeroImageIdx = $state(0);
    const nextPortraitHeroImageIdx = $derived(
        (currentPortraitHeroImageIdx + 1) % portraitHeros.length,
    );

    const cycleHeroImage = $derived(function () {
        currentLandscapeHeroImageIdx = nextLandscapeHeroImageIdx;
        currentPortraitHeroImageIdx = nextPortraitHeroImageIdx;
        setTimeout(cycleHeroImage, imageCycleTimeMs);
    });
    $effect(() => {
        setTimeout(cycleHeroImage, imageCycleTimeMs);
    });

    $effect(() => {
        preloadImages([
            landscapeHeros[nextLandscapeHeroImageIdx].src,
            portraitHeros[nextPortraitHeroImageIdx].src,
        ]);
    });

    const introWords = $derived(intro.split(" "));

    const sizeClass = clsx(`h-screen w-screen`);
</script>

<div class={clsx(sizeClass, "relative grid py-6")}>
    <div class="animate-fadeIn absolute inset-0">
        <div>
            {#key currentLandscapeHeroImageIdx}
                <DirectusImage
                    inTransition={{ fn: fly, params: { x: "100%", opacity: 1 } }}
                    outTransition={{ fn: fly, params: { x: "-100%", opacity: 1 } }}
                    img={landscapeHeros[currentLandscapeHeroImageIdx]}
                    imgClass="saturate-[1.1]"
                    class={clsx(
                        sizeClass,
                        `
                            absolute! hidden
                            md:block
                        `,
                    )} />
            {/key}
        </div>
        <div>
            {#key currentPortraitHeroImageIdx}
                <DirectusImage
                    inTransition={{ fn: fly, params: { x: "100%", opacity: 1 } }}
                    outTransition={{ fn: fly, params: { x: "-100%", opacity: 1 } }}
                    img={landscapeHeros[currentLandscapeHeroImageIdx]}
                    imgClass="saturate-[1.1]"
                    class={clsx(
                        sizeClass,
                        `
                            absolute! block
                            md:hidden
                        `,
                    )} />
            {/key}
        </div>
        <div
            class="
                absolute size-full bg-white/40
                dark:bg-black/50
            ">
        </div>
    </div>

    <div
        class="
            mx-auto mt-auto mb-16 flex w-full max-w-7xl flex-col flex-wrap justify-around gap-y-3
            px-6
            md:mb-8 md:flex-row md:items-center md:px-12
            lg:px-16
        ">
        {#each introWords as word, idx (idx)}
            <span
                style={animationDelay(idx)}
                class={clsx(
                    fadeInBottom,
                    aHoverAnimation,
                    `
                        inline-block cursor-default text-2xl font-bold text-black
                        transition-[color,background-size,scale]! text-shadow-black/20
                        text-shadow-lg
                        before:h-0.75
                        hover:scale-105 hover:text-shadow-black/25
                        md:text-3xl
                        dark:text-gray-100 dark:text-shadow-gray-400/20
                        dark:hover:text-shadow-gray-300/25
                    `,
                )}>
                {word}
                {idx < introWords.length - 1 ? " " : ""}
            </span>
        {/each}
    </div>
</div>
