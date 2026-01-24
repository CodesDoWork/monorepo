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
    let outsideItems = $state<boolean[]>([]);

    $effect(() => {
        outsideItems = items.map((_, idx) => idx !== 0);
    });

    const offset = $derived(Math.max(0, outsideItems.indexOf(false) - buffer));
    const end = $derived(outsideItems.lastIndexOf(false) + buffer + 1);
    const displayedItems = $derived(items.slice(offset, end));
</script>

<ul class={clsx(className, "scrollbar-hide size-full min-h-0 overflow-y-auto")}>
    {#each displayedItems as item, idx (idx + offset)}
        {@const globalIdx = idx + offset}
        <div
            class={itemContainerClass}
            use:overflowOberserver={info => (outsideItems[globalIdx] = info.outside.parent)}>
            {@render children(item, globalIdx)}
        </div>
    {/each}
</ul>
