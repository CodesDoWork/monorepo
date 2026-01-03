<script lang="ts" generics="T">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import type { Snippet } from "svelte";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { clsx } from "clsx";
    import { H5 } from "../texts";
    import VerticalLine from "./VerticalLine.svelte";

    interface Props {
        steps: T[];
        date?: Snippet<[T]>;
        logo: (step: T) => DirectusImageParams;
        title: Snippet<[T]>;
        content: Snippet<[T]>;
        small?: boolean;
    }

    const { steps, date, logo, title, content, small = false }: Props = $props();
</script>

{#each steps as timestep, idx (idx)}
    <div
        class={clsx(
            "grid grid-cols-[2.5rem_1fr]",
            small
                ? `
                    grid-rows-[1rem_auto_4.75rem]
                    sm:grid-cols-[3.5rem_1fr]
                `
                : `
                    grid-rows-[1rem_auto_1fr]
                    sm:grid-cols-[4rem_1fr]
                `,
        )}>
        <VerticalLine />
        <div class={clsx("row-span-3 mt-2 ml-4", small ? "pb-2" : "pb-8")}>
            <span
                class="
                    text-sm text-slate-500 italic
                    dark:text-slate-400
                ">
                {@render date?.(timestep)}{@html date ? undefined : "&nbsp;"}
            </span>
            <H5
                commandStyle={false}
                class={clsx(
                    "text-black!",
                    small && "text-base!",
                    small ? "dark:text-primary-500!" : "dark:text-white!",
                )}>
                {@render title(timestep)}
            </H5>
            {@render content(timestep)}
        </div>
        <DirectusImage
            imgClass={clsx("rounded-full")}
            class="aspect-square size-full rounded-full border border-slate-400 p-0.5"
            img={logo(timestep)} />
        <VerticalLine />
    </div>
{/each}
