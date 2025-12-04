<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import { fly } from "svelte/transition";
    import { animationDelay } from "../utils/animation-delay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { landscapeHeros, portraitHeros, texts, imageCycleTimeMs } = data;

    let currentLandscapeHeroImageIdx = $state(0);
    let currentPortraitHeroImageIdx = $state(0);
    function cycleHeroImage() {
        currentLandscapeHeroImageIdx = (currentLandscapeHeroImageIdx + 1) % landscapeHeros.length;
        currentPortraitHeroImageIdx = (currentPortraitHeroImageIdx + 1) % portraitHeros.length;
        setTimeout(cycleHeroImage, imageCycleTimeMs);
    }
    setTimeout(cycleHeroImage, imageCycleTimeMs);

    const animate = (...classes: string[]) => clsx(...classes, "animate-fadeInBT opacity-0");
    const introWords = texts.intro.split(" ");
</script>

<div
    class="
        relative grid h-screen w-screen py-6
        md:max-h-240 md:min-h-0
    ">
    <div class="animate-fadeIn absolute inset-0">
        <div>
            {#key currentLandscapeHeroImageIdx}
                <img
                    in:fly={{ x: "100%", opacity: 1 }}
                    out:fly={{ x: "-100%", opacity: 1 }}
                    src={landscapeHeros[currentLandscapeHeroImageIdx]}
                    alt="hero"
                    class="
                        absolute hidden h-screen w-screen object-cover object-center saturate-[1.1]
                        md:block md:max-h-240
                    " />
            {/key}
        </div>
        <div>
            {#key currentPortraitHeroImageIdx}
                <img
                    in:fly={{ x: "100%", opacity: 1 }}
                    out:fly={{ x: "-100%", opacity: 1 }}
                    src={portraitHeros[currentPortraitHeroImageIdx]}
                    alt="hero"
                    class="
                        absolute block h-screen w-screen object-cover object-center saturate-[1.1]
                        md:hidden md:max-h-240
                    " />
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
            mx-auto my-auto flex w-full max-w-7xl flex-col flex-wrap gap-x-12 gap-y-4 px-6
            text-shadow-black/15 text-shadow-lg
            md:flex-row md:items-center md:px-12
            lg:px-16
            dark:text-shadow-gray-200/15
        ">
        {#each introWords as word, idx (idx)}
            <span
                style={animationDelay(idx)}
                class={animate(
                    "inline-block text-3xl font-bold text-(--primary) dark:text-gray-200 sm:text-4xl md:text-5xl lg:text-6xl",
                )}>
                {word}
                {idx < introWords.length - 1 ? " " : ""}
            </span>
        {/each}
    </div>
</div>
