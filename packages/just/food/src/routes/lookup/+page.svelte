<script lang="ts">
    import type { BSLItem } from "../../lib/client/bsl-item";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { getBSLContext } from "../../lib/client/contexts/bsl";

    const bsl = getBSLContext();
    const bslData = $derived(bsl.data);

    // --- UTILS ---
    function getFlattenedKeys(obj: any, prefix = ""): string[] {
        let keys: string[] = [];
        for (const key in obj) {
            if (
                typeof obj[key] === "object" &&
                obj[key] !== null &&
                key !== "fattyAcids" &&
                key !== "aminoAcids"
            ) {
                keys = keys.concat(getFlattenedKeys(obj[key], `${prefix + key}.`));
            } else {
                keys.push(prefix + key);
            }
        }
        return keys;
    }

    const allPossibleColumns = $derived(
        getFlattenedKeys(bslData[0] || {}).filter(
            k => !["code", "description", "name"].includes(k),
        ),
    );

    // --- TOP NUTRIENTS FILTER (ADDED) ---
    // unique list of nutrients present as topNutrients across dataset
    const allTopNutrients = $derived([
        ...new Set(bslData.flatMap((item: BSLItem) => item.topNutrients || [])),
    ]);

    let selectedTopNutrients = $state(new Set<string>()); // selected nutrient filters
    let isTopNutrientSelectorOpen = $state(false);
    // filter mode: 'any' => item matches if it contains any selected nutrient
    // 'all' => item must contain all selected nutrients
    let topNutrientFilterMode = $state<"any" | "all">("any");

    function toggleTopNutrient(n: string) {
        const newSet = new Set(selectedTopNutrients);
        if (newSet.has(n)) {
            newSet.delete(n);
        } else {
            newSet.add(n);
        }
        selectedTopNutrients = newSet;
    }

    function clearTopNutrientFilters() {
        selectedTopNutrients = new Set();
    }

    function itemMatchesTopNutrients(item: BSLItem) {
        if (selectedTopNutrients.size === 0) return true;
        const present = new Set(item.topNutrients || []);
        if (topNutrientFilterMode === "any") {
            for (const n of selectedTopNutrients) {
                if (present.has(n)) return true;
            }
            return false;
        } else {
            // 'all'
            for (const n of selectedTopNutrients) {
                if (!present.has(n)) return false;
            }
            return true;
        }
    }

    // --- VALUE HELPERS ---
    function getValueByPath(obj: any, path: string) {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    }

    function formatValue(val: any): string {
        if (typeof val === "bigint") {
            return val.toString();
        }
        if (typeof val === "number") {
            return val.toFixed(2);
        }
        if (val === undefined || val === null) {
            return "-";
        }

        return String(val);
    }

    let searchQuery = $state("");
    // integrate nutrient filters into searchResults
    const searchResults = $derived.by(() => {
        const query = searchQuery.replaceAll(" ", "").toLowerCase();
        // start from full dataset
        let items = bslData;
        if (query) {
            items = items.filter(item => item._searchStr.includes(query));
        }
        // apply top nutrient filters
        items = items.filter(item => itemMatchesTopNutrients(item));
        return items;
    });

    let selectedItem = $state<BSLItem | null>(null);
    let compareSet = $state(new Set<string>());
    let compareMode = $state(false);

    // Column Selection
    let selectedColumns = $state(
        new Set<string>([
            "energy.energy_kcal",
            "protein_g",
            "carbohydrates.available_total_g",
            "fat_total_g",
        ]),
    );
    let isColumnSelectorOpen = $state(false);

    const compareItems = $derived(bslData.filter(item => compareSet.has(item.code || "")));

    // --- ACTIONS ---
    function toggleCompareItem(code: string) {
        const newSet = new Set(compareSet);
        if (newSet.has(code)) {
            newSet.delete(code);
        } else {
            newSet.add(code);
        }
        compareSet = newSet;
    }

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

{#snippet dataTree(data: any)}
    <div
        class="
            space-y-1 border-l-2 border-gray-200 pl-4
            dark:border-gray-700
        ">
        <VirtualList items={Object.entries(data)}>
            {#snippet children([key, value])}
                {#if value !== null && value !== undefined}
                    <div
                        class="
                            text-sm text-gray-800
                            dark:text-gray-200
                        ">
                        {#if typeof value === "object" && !Array.isArray(value)}
                            <span
                                class="
                                    text-primary-600
                                    dark:text-primary-400
                                    font-semibold capitalize
                                ">
                                {key.replace(/_/g, " ")}:
                            </span>
                            {@render dataTree(value)}
                        {:else}
                            <div
                                class="
                                    flex justify-between border-b border-gray-100 py-1
                                    last:border-0
                                    dark:border-gray-700
                                ">
                                <span
                                    class="
                                        text-gray-500 capitalize
                                        dark:text-gray-400
                                    ">
                                    {key.replace(/_/g, " ")}
                                </span>
                                <span
                                    class="
                                        font-mono text-gray-900
                                        dark:text-gray-100
                                    ">
                                    {formatValue(value)}
                                </span>
                            </div>
                        {/if}
                    </div>
                {/if}
            {/snippet}
        </VirtualList>
    </div>
{/snippet}

<div
    class="
        flex h-screen flex-col bg-gray-50 font-sans text-gray-800
        dark:bg-gray-900 dark:text-gray-100
    ">
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
                            flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100
                            px-4 py-2 text-sm font-medium transition-colors
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

                    <!-- Top Nutrients button (added) -->
                    <button
                        onclick={() => (isTopNutrientSelectorOpen = !isTopNutrientSelectorOpen)}
                        class="
                            flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100
                            px-4 py-2 text-sm font-medium transition-colors
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
                <div
                    class="
                        mt-4 grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-lg border
                        border-gray-200 bg-gray-50 p-4
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
                                title={col}>{col}</span>
                        </label>
                    {/each}
                </div>
            {/if}

            {#if isTopNutrientSelectorOpen}
                <div
                    class="
                        mt-4 grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-lg border
                        border-gray-200 bg-gray-50 p-4
                        sm:grid-cols-2
                        md:grid-cols-3
                        dark:border-gray-700 dark:bg-gray-800
                    ">
                    <div
                        class="
                            col-span-full mb-2 flex items-center justify-between border-b pb-2
                            text-sm text-gray-500
                            dark:border-gray-700 dark:text-gray-400
                        ">
                        <div>Filter by Top Nutrients:</div>
                        <div class="flex items-center gap-2">
                            <div class="text-xs text-gray-500">Mode:</div>
                            <button
                                onclick={() => (topNutrientFilterMode = "any")}
                                class={clsx(
                                    "rounded-sm px-2 py-1 text-xs",
                                    topNutrientFilterMode === "any"
                                        ? "bg-primary-600 text-white"
                                        : `
                                        bg-gray-100
                                        dark:bg-gray-700
                                    `,
                                )}>
                                Any
                            </button>
                            <button
                                onclick={() => (topNutrientFilterMode = "all")}
                                class={clsx(
                                    "rounded-sm px-2 py-1 text-xs",
                                    topNutrientFilterMode === "all"
                                        ? "bg-primary-600 text-white"
                                        : `
                                        bg-gray-100
                                        dark:bg-gray-700
                                    `,
                                )}>
                                All
                            </button>
                            <button
                                onclick={() => clearTopNutrientFilters()}
                                class="
                                    ml-2 rounded-sm bg-gray-100 px-2 py-1 text-xs
                                    dark:bg-gray-700
                                ">
                                Clear
                            </button>
                        </div>
                    </div>

                    {#each allTopNutrients as nut}
                        <label
                            class="
                                flex cursor-pointer items-center space-x-2 rounded-sm p-1 text-xs
                                hover:bg-gray-100
                                dark:hover:bg-gray-700
                            ">
                            <input
                                type="checkbox"
                                checked={selectedTopNutrients.has(nut)}
                                onchange={() => toggleTopNutrient(nut)}
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
                                title={nut}>{nut}</span>
                        </label>
                    {/each}
                </div>
            {/if}
        </div>
    </header>

    <main
        class="
            relative flex-1 overflow-hidden bg-gray-50
            dark:bg-gray-950
        ">
        <div class="mx-auto size-full max-w-7xl">
            {#if compareMode}
                <div class="h-full overflow-y-auto p-4">
                    <div
                        class="
                            animate-in fade-in slide-in-from-bottom-4 overflow-hidden rounded-xl
                            bg-white shadow-lg
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
                                Comparison Table
                            </h2>
                            <span
                                class="
                                    text-primary-600
                                    dark:text-primary-400
                                    text-sm
                                ">{compareItems.length} items</span>
                        </div>
                        <div class="overflow-x-auto">
                            <table
                                class="
                                    w-full border-collapse text-left text-gray-800
                                    dark:text-gray-200
                                ">
                                <thead>
                                    <tr
                                        class="
                                            border-b bg-gray-50
                                            dark:border-gray-700 dark:bg-gray-800
                                        ">
                                        <th
                                            class="
                                                sticky left-0 z-10 w-48 bg-gray-50 p-4 font-semibold
                                                text-gray-600
                                                shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                                                dark:bg-gray-800 dark:text-gray-400
                                            ">
                                            Attribute
                                        </th>
                                        {#each compareItems as item}
                                            <th
                                                class="
                                                    min-w-[200px] border-l border-gray-200 p-4
                                                    font-bold
                                                    dark:border-gray-700
                                                ">
                                                <div class="flex flex-col">
                                                    <span>{item.name}</span>
                                                    <span class="text-xs font-normal text-gray-500">
                                                        {item.code}
                                                    </span>
                                                </div>
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        class="
                                            border-b border-gray-100
                                            hover:bg-gray-50
                                            dark:border-gray-700
                                            dark:hover:bg-gray-800/50
                                        ">
                                        <td
                                            class="
                                                sticky left-0 bg-white p-3 font-medium text-gray-700
                                                shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                                                dark:bg-gray-900 dark:text-gray-300
                                            ">
                                            Description
                                        </td>
                                        {#each compareItems as item}
                                            <td
                                                class="
                                                    border-l border-gray-100 p-3 text-sm
                                                    text-gray-600
                                                    dark:border-gray-700 dark:text-gray-400
                                                ">
                                                {item.description}
                                            </td>
                                        {/each}
                                    </tr>
                                    {#each Array.from(selectedColumns) as colKey}
                                        <tr
                                            class="
                                                border-b border-gray-100
                                                hover:bg-gray-50
                                                dark:border-gray-700
                                                dark:hover:bg-gray-800/50
                                            ">
                                            <td
                                                class="
                                                    sticky left-0 truncate bg-white p-3 text-sm
                                                    font-medium text-gray-700
                                                    shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                                                    dark:bg-gray-900 dark:text-gray-300
                                                "
                                                title={colKey}>
                                                {colKey.split(".").pop()?.replace(/_/g, " ")}
                                            </td>
                                            {#each compareItems as item}
                                                <td
                                                    class="
                                                        border-l border-gray-100 p-3 font-mono
                                                        text-sm
                                                        dark:border-gray-700
                                                    ">
                                                    {formatValue(getValueByPath(item, colKey))}
                                                </td>
                                            {/each}
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            {:else if searchResults.length === 0}
                <div
                    class="
                        py-20 text-center text-gray-500
                        dark:text-gray-400
                    ">
                    <p class="text-lg">No foods found matching "{searchQuery}"</p>
                </div>
            {:else}
                <div class="h-full px-4 pt-4">
                    <VirtualList items={searchResults}>
                        {#snippet children(item)}
                            <div class="mb-4">
                                <div
                                    class="
                                        dark:hover:border-primary-900
                                        flex flex-col justify-between gap-4 rounded-xl border
                                        border-gray-200 bg-white p-4 shadow-sm transition-shadow
                                        hover:shadow-md
                                        md:flex-row md:items-center
                                        dark:border-gray-800 dark:bg-gray-900
                                    ">
                                    <div class="flex grow items-start gap-4">
                                        <div class="pt-1">
                                            <input
                                                type="checkbox"
                                                checked={compareSet.has(item.code || "")}
                                                onchange={() => toggleCompareItem(item.code || "")}
                                                class="
                                                    text-primary-600
                                                    focus:ring-primary-500
                                                    size-5 cursor-pointer rounded-sm border-gray-300
                                                    dark:border-gray-600 dark:bg-gray-800
                                                "
                                                title="Select to compare" />
                                        </div>
                                        <div>
                                            <div class="mb-2 flex items-baseline gap-2">
                                                <h3
                                                    class="
                                                        text-lg font-bold text-gray-900
                                                        dark:text-gray-100
                                                    ">
                                                    {item.description}
                                                </h3>
                                                <span class="font-mono text-xs text-gray-400">
                                                    {item.code}
                                                </span>
                                            </div>

                                            <div class="flex flex-wrap gap-2 text-xs font-medium">
                                                <span
                                                    class="
                                                        bg-accent-50 text-accent-700
                                                        dark:bg-accent-900/30 dark:text-accent-300
                                                        rounded-sm px-2 py-1
                                                    ">
                                                    {item.energy?.energy_kcal ?? 0}&thinsp;kcal
                                                </span>
                                                <span
                                                    class="
                                                        bg-secondary-50 text-secondary-700
                                                        dark:bg-secondary-900/30
                                                        dark:text-secondary-300
                                                        rounded-sm px-2 py-1
                                                    ">
                                                    🍗 {item.protein_g ?? 0}&thinsp;g
                                                </span>
                                                <span
                                                    class="
                                                        bg-tertiary-50 text-tertiary-700
                                                        dark:bg-tertiary-900/30
                                                        dark:text-tertiary-300
                                                        rounded-sm px-2 py-1
                                                    ">
                                                    🍞 {item.carbohydrates?.available_total_g ??
                                                        0}&thinsp;g
                                                </span>
                                                <span
                                                    class="
                                                        bg-primary-50 text-primary-700
                                                        dark:bg-primary-900/30 dark:text-primary-300
                                                        rounded-sm px-2 py-1
                                                    ">
                                                    🥑 {item.fat_total_g ?? 0}&thinsp;g
                                                </span>

                                                {#each item.topNutrients as nutrient}
                                                    <!-- nutrient tag is now clickable to toggle filter -->
                                                    <button
                                                        onclick={() => toggleTopNutrient(nutrient)}
                                                        class={clsx(
                                                            `
                                                                rounded-sm px-2 py-1 text-xs
                                                                text-stone-700
                                                            `,
                                                            selectedTopNutrients.has(nutrient)
                                                                ? "bg-primary-600 text-white"
                                                                : `
                                                                    bg-stone-100
                                                                    dark:bg-stone-950/30
                                                                    dark:text-stone-300
                                                                `,
                                                        )}
                                                        title="Toggle nutrient filter">
                                                        Top 3&thinsp;% {nutrient}
                                                    </button>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onclick={() => (selectedItem = item)}
                                        class="
                                            bg-primary-50 text-primary-600
                                            hover:bg-primary-100
                                            dark:bg-primary-900/20 dark:text-primary-400
                                            dark:hover:bg-primary-900/40
                                            w-full rounded-lg px-4 py-2 text-sm font-medium
                                            transition-colors
                                            md:w-auto
                                        ">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        {/snippet}
                    </VirtualList>
                </div>
            {/if}
        </div>
    </main>

    {#if selectedItem}
        <div
            class="
                fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm
            "
            onclick={() => (selectedItem = null)}
            role="dialog"
            aria-modal="true">
            <div
                class="
                    animate-in zoom-in-95 flex max-h-[90vh] w-full max-w-2xl flex-col
                    overflow-hidden rounded-2xl bg-white shadow-2xl duration-200
                    dark:bg-gray-900
                "
                onclick={e => e.stopPropagation()}>
                <div
                    class="
                        flex items-start justify-between border-b border-gray-100 bg-gray-50 p-6
                        dark:border-gray-800 dark:bg-gray-800/50
                    ">
                    <div>
                        <h2
                            class="
                                text-2xl font-bold text-gray-900
                                dark:text-white
                            ">
                            {selectedItem.name}
                        </h2>
                        <p
                            class="
                                text-gray-600
                                dark:text-gray-400
                            ">
                            {selectedItem.description}
                        </p>
                    </div>
                    <button
                        onclick={() => (selectedItem = null)}
                        class="
                            rounded-full border bg-white p-1 text-gray-400 shadow-sm
                            hover:text-gray-600
                            dark:border-gray-700 dark:bg-gray-800
                            dark:hover:text-gray-200
                        ">
                        <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    {@render dataTree(selectedItem)}
                </div>

                <div
                    class="
                        flex justify-end gap-2 border-t border-gray-100 bg-gray-50 p-4
                        dark:border-gray-800 dark:bg-gray-900
                    ">
                    <button
                        onclick={() => {
                            if (selectedItem?.code) {
                                toggleCompareItem(selectedItem.code);
                            }
                        }}
                        class="
                            rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                            transition-colors
                            hover:bg-white
                            dark:border-gray-600 dark:text-gray-200
                            dark:hover:bg-gray-800
                        ">
                        {compareSet.has(selectedItem.code || "")
                            ? "Remove from Compare"
                            : "Add to Compare"}
                    </button>
                    <button
                        onclick={() => (selectedItem = null)}
                        class="
                            bg-primary-600
                            hover:bg-primary-700
                            rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors
                        ">
                        Close
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
