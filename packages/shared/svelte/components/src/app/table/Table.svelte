<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        title: string;
        info?: string;
        rows: number;
        cols: number;
        headerRow?: Snippet<[number]>;
        headerCol?: Snippet<[number]>;
        headerColHeading?: Snippet;
        cell: Snippet<[{ row: number; col: number }]>;
    }

    const { title, info, rows, cols, headerRow, headerCol, headerColHeading, cell }: Props =
        $props();

    const rowArray = $derived(Array.from({ length: rows }, (_, idx) => idx));
    const colArray = $derived(Array.from({ length: cols }, (_, idx) => idx));

    const cellClass = clsx(`
        border-gray-100
        dark:border-gray-700
    `);
</script>

<div
    class="
        overflow-hidden rounded-xl bg-white shadow-lg
        dark:bg-gray-900
    ">
    <div
        class="
            border-primary-100 bg-primary-50/50
            dark:border-primary-900/50 dark:bg-primary-900/20
            flex items-center justify-between border-b p-4
        ">
        <h2
            class="
                text-primary-800
                dark:text-primary-300
                text-xl font-bold
            ">
            {title}
        </h2>
        <span
            class="
                text-primary-600
                dark:text-primary-400
                text-sm
            ">
            {info}
        </span>
    </div>
    <div class="overflow-x-auto">
        <table
            class="
                w-full border-collapse text-left text-gray-800
                dark:text-gray-200
            ">
            {#if headerRow}
                <thead>
                    <tr
                        class="
                            border-b bg-gray-50
                            dark:border-gray-700 dark:bg-gray-800
                        ">
                        {#each [...colArray, ...(headerColHeading ? [colArray.length] : [])] as idx}
                            <th
                                class={clsx(
                                    `
                                        min-w-[200px] border-gray-200 p-4 font-bold
                                        dark:border-gray-700
                                    `,
                                    idx > 0 && "border-l",
                                    idx === 0 &&
                                        headerCol &&
                                        `
                                            sticky left-0 z-10 w-48 bg-gray-50 font-semibold
                                            text-gray-600 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                                            dark:bg-gray-800 dark:text-gray-400
                                        `,
                                )}>
                                {#if idx === 0}
                                    {@render headerColHeading?.()}
                                {:else}
                                    {@render headerRow(idx)}
                                {/if}
                            </th>
                        {/each}
                    </tr>
                </thead>
            {/if}
            <tbody>
                {#each rowArray as rowIdx}
                    <tr
                        class={clsx(
                            cellClass,
                            `
                                group border-b
                                hover:bg-gray-50
                                dark:hover:bg-gray-800/50
                            `,
                        )}>
                        {#if headerCol}
                            <td
                                class="
                                    sticky left-0 truncate bg-white p-3 text-sm font-medium
                                    text-gray-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                                    group-hover:bg-gray-50
                                    dark:bg-gray-900 dark:text-gray-300
                                    dark:group-hover:bg-gray-800/50
                                ">
                                {@render headerCol(rowIdx)}
                            </td>
                        {/if}
                        {#each colArray as colIdx}
                            <td class={clsx(cellClass, `border-l p-3 font-mono text-sm`)}>
                                {@render cell({ row: rowIdx, col: colIdx })}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
