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
    // svelte-ignore state_referenced_locally
    let overflowinItems = $state(items.map(() => false));

    $effect(() => {
        overflowinItems = items.map(() => false);
    });

    const offset = $derived.by(() => {
        const firstInView = overflowinItems.indexOf(false);
        return Math.max(0, firstInView - buffer);
    });

    const displayedItems = $derived.by(() => {
        const lastInView = overflowinItems.lastIndexOf(false);
        return items.slice(offset, lastInView + buffer + 1);
    });
</script>

<ul class={clsx(className, "scrollbar-hide size-full min-h-0 overflow-y-auto")}>
    {#each displayedItems as item, idx (idx + offset)}
        <div
            class={itemContainerClass}
            use:overflowOberserver={info => (overflowinItems[idx + offset] = info.parent)}>
            {@render children(item, idx + offset)}
        </div>
    {/each}
</ul>
