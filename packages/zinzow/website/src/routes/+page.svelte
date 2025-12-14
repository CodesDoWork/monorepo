<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import { fly } from "svelte/transition";
    import { DirectusImage } from "../components/directus-image";
    import { animationDelay } from "../utils/animation-delay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { landscapeHeros, portraitHeros, imageCycleTimeMs, intro } = $derived(data);

    let currentLandscapeHeroImageIdx = $state(0);
    let currentPortraitHeroImageIdx = $state(0);
    const cycleHeroImage = $derived(function () {
        currentLandscapeHeroImageIdx = (currentLandscapeHeroImageIdx + 1) % landscapeHeros.length;
        currentPortraitHeroImageIdx = (currentPortraitHeroImageIdx + 1) % portraitHeros.length;
        setTimeout(cycleHeroImage, imageCycleTimeMs);
    });
    $effect(() => {
        setTimeout(cycleHeroImage, imageCycleTimeMs);
    });

    const animate = (...classes: string[]) => clsx(...classes, "animate-fadeInBT opacity-0");
    const introWords = $derived(intro.split(" "));

    const sizeClass = clsx(`
        h-screen w-screen
        md:max-h-272 md:min-h-0
    `);
</script>

<div class={clsx(sizeClass, "relative grid py-6")}>
    <div class="animate-fadeIn absolute inset-0">
        <div>
            {#key currentLandscapeHeroImageIdx}
                <DirectusImage
                    inTransition={{ fn: fly, params: { x: "100%", opacity: 1 } }}
                    outTransition={{ fn: fly, params: { x: "-100%", opacity: 1 } }}
                    img={landscapeHeros[currentLandscapeHeroImageIdx]}
                    class={clsx(
                        sizeClass,
                        `
                            absolute hidden saturate-[1.1]
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
                    class={clsx(
                        sizeClass,
                        `
                            absolute block saturate-[1.1]
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
            mx-auto mt-auto mb-24 flex w-full max-w-7xl flex-col flex-wrap justify-around gap-y-3
            px-6 text-shadow-black/20 text-shadow-lg
            md:mb-8 md:flex-row md:items-center md:px-12
            lg:px-16
            dark:text-shadow-gray-400/20
        ">
        {#each introWords as word, idx (idx)}
            <span
                style={animationDelay(idx)}
                class={animate(
                    "inline-block text-2xl font-bold text-black dark:text-gray-200 sm:text-3xl md:text-4xl lg:text-5xl",
                )}>
                {word}
                {idx < introWords.length - 1 ? " " : ""}
            </span>
        {/each}
    </div>
</div>
