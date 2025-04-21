<script lang="ts" generics="T">
    import type { Snippet } from "svelte";
    import Heading from "./Heading.svelte";
    import VerticalLine from "./VerticalLine.svelte";

    interface Props {
        steps: T[];
        date?: Snippet<[T]>;
        logo: (step: T) => string;
        title: Snippet<[T]>;
        content: Snippet<[T]>;
    }

    const { steps, date, logo, title, content }: Props = $props();
</script>

{#each steps as timestep, idx (idx)}
    <div class="grid grid-cols-[2.5rem_1fr] grid-rows-[1rem_auto_1fr] sm:grid-cols-[4rem_1fr]">
        <VerticalLine />
        <div class="row-span-3 ml-4 mt-2 pb-8">
            <span class="text-sm italic text-slate-400">
                {@render date?.(timestep)}{@html date ? undefined : "&nbsp;"}
            </span>
            <Heading commandStyle={false} class="!text-black dark:!text-white" level="h5">
                {@render title(timestep)}
            </Heading>
            {@render content(timestep)}
        </div>
        <img
            alt="Logo"
            class="aspect-square w-full rounded-full border border-slate-400 object-cover p-0.5"
            src={logo(timestep)} />
        <VerticalLine />
    </div>
{/each}
