<script lang="ts" generics="T">
    import type { Snippet } from "svelte";
    import SmallHeading from "./SmallHeading.svelte";
    import clsx from "clsx";

    interface Props {
        text: string;
        items: T[];
        display: Snippet<[T]>;
        direction?: "row" | "column";
    }

    const { text, items, display, direction = "row" }: Props = $props();
</script>

{#if items.length}
    <div>
        <SmallHeading>{text}</SmallHeading>
        <ul class={clsx("flex flex-wrap gap-2", direction === "row" ? "flex-row" : "flex-col")}>
            {#each items as item}
                <li>
                    {@render display(item)}
                </li>
            {/each}
        </ul>
    </div>
{/if}
