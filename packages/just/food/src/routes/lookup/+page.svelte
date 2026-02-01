<script lang="ts">
    import type { BSLItem, NutrientPaths } from "../../lib/client/bsl-item";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { getFlattenedKeys } from "@cdw/monorepo/shared-utils/objects";
    import { getBSLContext } from "../../lib/client/contexts/bsl";
    import CompareTable from "./CompareTable.svelte";
    import FoodCard from "./FoodCard.svelte";
    import FoodDetailsPopup from "./FoodDetailsPopup.svelte";
    import Header from "./Header.svelte";

    const bsl = getBSLContext();
    const bslData = $derived(bsl.data);

    const allPossibleColumns = $derived(
        getFlattenedKeys(bslData[0] || {}).filter(
            k => !["code", "description", "name", "topNutrients", "_searchStr"].includes(k),
        ),
    );

    const allTopNutrients = $derived([
        ...new Set(bslData.flatMap((item: BSLItem) => item.topNutrients || [])),
    ]);

    let selectedTopNutrients = $state(new Set<string>());
    let isTopNutrientSelectorOpen = $state(false);
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
        if (selectedTopNutrients.size === 0) {
            return true;
        }

        const present = new Set(item.topNutrients || []);
        if (topNutrientFilterMode === "any") {
            for (const n of selectedTopNutrients) {
                if (present.has(n as NutrientPaths)) {
                    return true;
                }
            }
            return false;
        } else {
            for (const n of selectedTopNutrients) {
                if (!present.has(n as NutrientPaths)) {
                    return false;
                }
            }
            return true;
        }
    }

    let searchQuery = $state("");
    const searchResults = $derived.by(() => {
        const query = searchQuery.replaceAll(" ", "").toLowerCase();
        let tmpItems = bslData;
        if (query) {
            tmpItems = tmpItems.filter(item => item._searchStr.includes(query));
        }

        return tmpItems.filter(item => itemMatchesTopNutrients(item));
    });

    let selectedItem = $state<BSLItem | null>(null);
    let compareSet = $state(new Set<string>());
    let compareMode = $state(false);

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

    function toggleCompareItem(code: string) {
        const newSet = new Set(compareSet);
        if (newSet.has(code)) {
            newSet.delete(code);
        } else {
            newSet.add(code);
        }
        compareSet = newSet;
    }
</script>

<div
    class="
        flex h-screen flex-col bg-gray-50 font-sans text-gray-800
        dark:bg-gray-900 dark:text-gray-100
    ">
    <Header
        bind:searchQuery
        bind:isTopNutrientSelectorOpen
        bind:isColumnSelectorOpen
        bind:compareMode
        bind:topNutrientFilterMode
        bind:selectedColumns
        {compareSet}
        {allPossibleColumns}
        {selectedTopNutrients}
        {allTopNutrients}
        {toggleTopNutrient}
        {clearTopNutrientFilters} />
    <main
        class="
            relative flex-1 overflow-hidden bg-gray-50
            dark:bg-gray-950
        ">
        <div class="mx-auto size-full max-w-7xl">
            {#if compareMode}
                <CompareTable {compareItems} selectedColumns={selectedColumns.values().toArray()} />
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
                            <FoodCard
                                {item}
                                setSelectedItem={item => (selectedItem = item)}
                                {compareSet}
                                {toggleCompareItem}
                                {toggleTopNutrient}
                                {selectedTopNutrients} />
                        {/snippet}
                    </VirtualList>
                </div>
            {/if}
        </div>
    </main>

    <FoodDetailsPopup
        bind:selectedItem
        {toggleCompareItem}
        isInCompare={compareSet.has(selectedItem?.code || "")} />
</div>
