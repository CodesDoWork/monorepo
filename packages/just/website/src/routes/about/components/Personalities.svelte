<script lang="ts">
    import type { PageData } from "../$types";
    import clsx from "clsx";
    import { fly } from "svelte/transition";
    import BigFive from "./big-five/BigFive.svelte";
    import Disc from "./Disc.svelte";
    import Mbti from "./Mbti.svelte";

    interface Props {
        disc: PageData["disc"];
        bigFive: PageData["bigFive"];
        mbti: PageData["mbti"];
        currentLanguage: PageData["currentLanguage"];
    }

    const properties: Props = $props();
    const { disc, bigFive, mbti } = properties;
    const types = [
        { name: disc.name, component: Disc, properties },
        { name: bigFive.name, component: BigFive, properties },
        { name: mbti.name, component: Mbti, properties },
    ];
    let selectedIdx = $state(0);
    let transitionFactor = $state(1);
    const selectedType = $derived(types[selectedIdx]);
    const PersonalityDisplay = $derived(selectedType.component);
    const slideBy = 75;
</script>

<div class="flex justify-between sm:px-4 md:px-0 lg:px-4">
    {#each types as type, idx (idx)}
        <button
            class={clsx(
                "rounded px-3 py-2 shadow hover:shadow-md",
                "transition",
                selectedIdx === idx
                    ? "bg-primary-400/40 dark:bg-primary-600/40"
                    : "bg-primary-400/10 dark:bg-primary-600/10 text-slate-600 dark:text-slate-300",
                "hover:bg-primary-400/50 hover:dark:bg-primary-600/50 hover:text-black dark:hover:text-white",
            )}
            onclick={() => {
                transitionFactor = idx < selectedIdx ? -1 : 1;
                selectedIdx = idx;
            }}>{type.name}</button>
    {/each}
</div>

<div class="relative h-56 mt-4">
    {#key selectedType.name}
        <div
            class="absolute w-full h-full"
            in:fly={{ x: slideBy * transitionFactor }}
            out:fly={{ x: -slideBy * transitionFactor }}>
            <PersonalityDisplay {...selectedType.properties} />
        </div>
    {/key}
</div>
