<script lang="ts">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import type { Video } from "./types";
    import { DirectusImage, YTVideo } from "@cdw/monorepo/shared-svelte-components";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { fadeInBottom } from "../../lib/common/styles";
    import { isDirectusParams } from "../../routes/impressionen/gallery.svelte";

    interface Props {
        columns: number;
        columnsArray: (Video | DirectusImageParams)[][];
        selectedCol: number;
        selectedRow: number;
        resetSelectedItem: () => void;
        selectItem: (col: number, row: number) => void;
        clickItem: (col: number, row: number) => void;
        animationDelay: number;
    }

    const {
        columns,
        columnsArray,
        selectedCol,
        selectedRow,
        resetSelectedItem,
        selectItem,
        clickItem,
        animationDelay: delay,
    }: Props = $props();

    const itemClass = (isSelected: boolean) =>
        clsx(
            `
                ring-primary rounded-md shadow-md
                sm:max-h-24
                md:max-h-36 md:rounded-lg
                lg:max-h-40
            `,
            isSelected &&
                `
                    ring-2
                    md:ring-4
                `,
        );
    const containerClass = clsx("w-full");
</script>

<ul
    class="
        row-start-1 mt-4 mb-2 grid grid-cols-6
        md:mb-4
        lg:col-span-2 lg:row-start-auto lg:mb-0
    ">
    {#each columnsArray as colItems, colIdx}
        <div class="flex flex-col">
            {#each colItems as item, rowIdx}
                {@const imgIdx = rowIdx * columns + colIdx}
                {@const isSelected = colIdx === selectedCol && rowIdx === selectedRow}
                <li class={fadeInBottom} style={animationDelay(delay + imgIdx)}>
                    <button
                        class="
                            group size-full cursor-pointer p-1
                            md:p-2
                        "
                        onclick={() => clickItem(colIdx, rowIdx)}
                        onmousemove={() => selectItem(colIdx, rowIdx)}
                        onmouseleave={resetSelectedItem}>
                        {#if isDirectusParams(item)}
                            <DirectusImage
                                img={item}
                                imgClass={itemClass(isSelected)}
                                sourceClass={clsx(`
                                    hidden
                                    md:block
                                `)}
                                class={containerClass} />
                        {:else}
                            <YTVideo
                                video={item}
                                class={clsx(
                                    itemClass(isSelected),
                                    containerClass,
                                    `pointer-events-none`,
                                )} />
                        {/if}
                    </button>
                </li>
            {/each}
        </div>
    {/each}
</ul>
