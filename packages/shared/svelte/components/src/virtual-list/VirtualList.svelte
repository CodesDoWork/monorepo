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
    let elementHeights = $state<number[]>([]);

    $effect(() => {
        outsideItems = items.map((_, idx) => idx !== 0);
        elementHeights = items.map(() => 0);
    });

    const offset = $derived(Math.max(0, outsideItems.indexOf(false) - buffer));
    const end = $derived(outsideItems.lastIndexOf(false) + buffer + 1);
    const displayedItems = $derived(items.slice(offset, end + buffer));

    const paddingTop = $derived(elementHeights.slice(0, offset).reduce((a, b) => a + b, 0));

    function resizeAction(node: HTMLDivElement, callback: (height: number) => void) {
        const resizeObserver = new ResizeObserver(() => {
            if (node && node.clientHeight) {
                callback(node.clientHeight);
            }
        });
        resizeObserver.observe(node);

        return {
            destroy() {
                resizeObserver.disconnect();
            },
        };
    }
</script>

<ul class={clsx(className, "scrollbar-hide relative size-full min-h-0 overflow-y-auto")}>
    <div style="padding-top: {paddingTop}px"></div>
    {#each displayedItems as item, idx (idx + offset)}
        {@const globalIdx = idx + offset}
        <div
            class={itemContainerClass}
            use:resizeAction={height => (elementHeights[globalIdx] = height)}
            use:overflowOberserver={info => {
                requestAnimationFrame(() => {
                    outsideItems = outsideItems.map((v, i) =>
                        i === globalIdx ? info.outside.parent : v,
                    );
                });
            }}>
            {@render children(item, globalIdx)}
        </div>
    {/each}
</ul>
