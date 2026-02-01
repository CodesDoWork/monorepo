<script lang="ts">
    import { BSL_NAMES } from "../../lib/client/bsl-item";

    interface Props {
        allPossibleColumns: string[];
        selectedColumns: Set<string>;
        toggleColumn: (col: string) => void;
    }

    const { allPossibleColumns, selectedColumns, toggleColumn }: Props = $props();
</script>

<div
    class="
        mt-4 grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-gray-200
        bg-gray-50 p-4
        sm:grid-cols-2
        md:grid-cols-3
        dark:border-gray-700 dark:bg-gray-800
    ">
    <div
        class="
            col-span-full mb-2 border-b pb-2 text-sm text-gray-500
            dark:border-gray-700 dark:text-gray-400
        ">
        Select data points to compare:
    </div>
    {#each allPossibleColumns as col}
        <label
            class="
                flex cursor-pointer items-center space-x-2 rounded-sm p-1 text-xs
                hover:bg-gray-100
                dark:hover:bg-gray-700
            ">
            <input
                type="checkbox"
                checked={selectedColumns.has(col)}
                onchange={() => toggleColumn(col)}
                class="
                    text-primary-600
                    focus:ring-primary-500
                    rounded-sm
                " />
            <span
                class="
                    truncate text-gray-700
                    dark:text-gray-300
                "
                title={col}>{BSL_NAMES[col]}</span>
        </label>
    {/each}
</div>
