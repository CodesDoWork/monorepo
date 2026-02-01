<script lang="ts">
    import { clsx } from "clsx";
    import ColumnSelection from "./ColumnSelection.svelte";
    import NutrientSelection from "./NutrientSelection.svelte";

    interface Props {
        searchQuery: string;
        isColumnSelectorOpen: boolean;
        isTopNutrientSelectorOpen: boolean;
        compareMode: boolean;
        topNutrientFilterMode: "any" | "all";
        compareSet: Set<string>;
        allPossibleColumns: string[];
        selectedColumns: Set<string>;
        selectedTopNutrients: Set<string>;
        allTopNutrients: string[];
        toggleTopNutrient: (nutrient: string) => void;
        clearTopNutrientFilters: () => void;
    }

    let {
        searchQuery = $bindable(),
        isColumnSelectorOpen = $bindable(),
        isTopNutrientSelectorOpen = $bindable(),
        compareMode = $bindable(),
        topNutrientFilterMode = $bindable(),
        selectedColumns = $bindable(),
        compareSet,
        allPossibleColumns,
        selectedTopNutrients,
        allTopNutrients,
        toggleTopNutrient,
        clearTopNutrientFilters,
    }: Props = $props();

    function toggleColumn(col: string) {
        const newSet = new Set(selectedColumns);
        if (newSet.has(col)) {
            newSet.delete(col);
        } else {
            newSet.add(col);
        }
        selectedColumns = newSet;
    }
</script>

<header
    class="
        z-20 border-b border-gray-200 bg-white shadow-sm
        dark:border-gray-800 dark:bg-gray-900
    ">
    <div class="mx-auto max-w-7xl p-4">
        <h1
            class="
                text-primary-700
                dark:text-primary-400
                mb-4 text-2xl font-bold
            ">
            BSL Food Explorer
        </h1>

        <div
            class="
                flex flex-col items-start gap-4
                md:flex-row md:items-center
            ">
            <div class="relative w-full grow">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search foods (e.g., Apple, Cheese)..."
                    class="
                        focus:ring-primary-500
                        w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10
                        text-gray-900
                        focus:ring-2 focus:outline-none
                        dark:border-gray-700 dark:bg-gray-800 dark:text-white
                    " />
                <svg
                    class="absolute top-2.5 left-3 size-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>

            <div
                class="
                    flex w-full gap-2
                    md:w-auto
                ">
                <button
                    onclick={() => (isColumnSelectorOpen = !isColumnSelectorOpen)}
                    class="
                        flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-4
                        py-2 text-sm font-medium transition-colors
                        hover:bg-gray-200
                        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                        dark:hover:bg-gray-700
                    ">
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span
                        class="
                            hidden
                            sm:inline
                        ">Columns</span>
                </button>

                <button
                    onclick={() => (isTopNutrientSelectorOpen = !isTopNutrientSelectorOpen)}
                    class="
                        flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-4
                        py-2 text-sm font-medium transition-colors
                        hover:bg-gray-200
                        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                        dark:hover:bg-gray-700
                    ">
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM4.5 21c0-3.038 2.462-5.5 5.5-5.5h4c3.038 0 5.5 2.462 5.5 5.5" />
                    </svg>
                    <span
                        class="
                            hidden
                            sm:inline
                        ">Top Nutrients</span>
                </button>

                <button
                    disabled={compareSet.size < 1}
                    onclick={() => (compareMode = !compareMode)}
                    class={clsx(
                        `
                            flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                            whitespace-nowrap transition-colors
                        `,
                        compareMode
                            ? `
                                border border-red-200 bg-red-100 text-red-700
                                hover:bg-red-200
                                dark:border-red-900 dark:bg-red-900/30 dark:text-red-400
                            `
                            : `
                                bg-primary-600
                                hover:bg-primary-700
                                dark:bg-primary-700
                                dark:hover:bg-primary-600
                                text-white
                                disabled:cursor-not-allowed disabled:opacity-50
                            `,
                    )}>
                    {#if compareMode}
                        Close
                    {:else}
                        Compare ({compareSet.size})
                    {/if}
                </button>
            </div>
        </div>

        {#if isColumnSelectorOpen}
            <ColumnSelection {allPossibleColumns} {selectedColumns} {toggleColumn} />
        {/if}

        {#if isTopNutrientSelectorOpen}
            <NutrientSelection
                bind:topNutrientFilterMode
                {selectedTopNutrients}
                {allTopNutrients}
                {toggleTopNutrient}
                {clearTopNutrientFilters} />
        {/if}
    </div>
</header>
