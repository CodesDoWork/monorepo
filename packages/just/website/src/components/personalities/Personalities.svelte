<script lang="ts">
    import type { BigFiveProps } from "./big-five";
    import type { DiscProps } from "./disc";
    import type { MbtiProps } from "./mbti";
    import { clsx } from "clsx";
    import { fly } from "svelte/transition";
    import { BigFive } from "./big-five";
    import { Disc } from "./disc";
    import { Mbti } from "./mbti";

    interface Props {
        disc: DiscProps;
        bigFive: BigFiveProps;
        mbti: MbtiProps;
        currentLanguageCode: string;
    }

    const properties: Props = $props();
    const { disc, bigFive, mbti } = $derived(properties);
    const types = $derived([
        { name: disc.name, component: Disc, properties },
        { name: bigFive.name, component: BigFive, properties },
        { name: mbti.name, component: Mbti, properties },
    ]);

    let selectedIdx = $state(0);
    let transitionFactor = $state(1);
    const selectedType = $derived(types[selectedIdx]);
    const PersonalityDisplay = $derived(selectedType.component);
    const slideBy = 75;
</script>

<div
    class="
        flex justify-between
        sm:px-4
        md:px-0
        lg:px-4
    ">
    {#each types as type, idx (idx)}
        <button
            class={clsx(
                `
                    hover:bg-primary-400/50
                    hover:dark:bg-primary-600/50
                    rounded-sm px-3 py-2 shadow-sm transition
                    hover:text-black hover:shadow-md
                    dark:hover:text-white
                `,
                selectedIdx === idx
                    ? `
                        bg-primary-400/40
                        dark:bg-primary-600/40
                    `
                    : `
                        bg-primary-400/10
                        dark:bg-primary-600/10
                        text-slate-600
                        dark:text-slate-300
                    `,
            )}
            onclick={() => {
                transitionFactor = idx < selectedIdx ? -1 : 1;
                selectedIdx = idx;
            }}>{type.name}</button>
    {/each}
</div>

<div class="relative mt-4 h-56">
    {#key selectedType.name}
        <div
            class="absolute size-full"
            in:fly={{ x: slideBy * transitionFactor }}
            out:fly={{ x: -slideBy * transitionFactor }}>
            <PersonalityDisplay {...selectedType.properties} />
        </div>
    {/key}
</div>
