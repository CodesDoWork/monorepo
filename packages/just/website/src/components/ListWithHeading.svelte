<script lang="ts" generics="T">
    import type { Snippet } from "svelte";
    import clsx from "clsx";
    import SmallHeading from "./SmallHeading.svelte";

    interface Props {
        listClass?: string;
        text: string;
        items: T[];
        display: Snippet<[T]>;
        direction?: "row" | "column";
    }

    const { listClass, text, items, display, direction = "row" }: Props = $props();
</script>

{#if items.length}
    <div>
        <SmallHeading>{text}</SmallHeading>
        <ul
            class={clsx(
                listClass,
                "flex flex-wrap gap-2",
                direction === "row" ? "flex-row" : "flex-col",
            )}>
            {#each items as item}
                <li class="leading-none">
                    {@render display(item)}
                </li>
            {/each}
        </ul>
    </div>
{/if}
