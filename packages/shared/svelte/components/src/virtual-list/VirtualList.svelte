<script lang="ts" generics="T">
    import type { Snippet } from "svelte";
    import { overflowOberserver } from "@cdw/monorepo/shared-svelte-actions";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        itemContainerClass?: string;
        items: T[];
        buffer?: number;
        children: Snippet<[T, number]>;
    }

    const { class: className, itemContainerClass, items, buffer = 3, children }: Props = $props();
    let overflowingItems: boolean[] = $state([]);

    $effect(() => {
        overflowingItems = items.map((_, idx) => idx !== 0);
    });

    const offset = $derived(Math.max(0, overflowingItems.indexOf(false) - buffer));
    const displayedItems = $derived(
        items.slice(offset, overflowingItems.lastIndexOf(false) + buffer + 1),
    );
</script>

<ul class={clsx(className, "scrollbar-hide size-full min-h-0 overflow-y-auto")}>
    {#each displayedItems as item, idx (idx + offset)}
        {#key displayedItems.length}
            {@const globalIdx = idx + offset}
            <div
                class={itemContainerClass}
                use:overflowOberserver={info => (overflowingItems[globalIdx] = info.parent)}>
                {@render children(item, globalIdx)}
            </div>
        {/key}
    {/each}
</ul>
