<script lang="ts">
    import type { BSLItem, NutrientPaths } from "../../lib/client/bsl-item";
    import type { BSLItemPaths, SelectableItem } from "./types";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { getFlattenedKeys } from "@cdw/monorepo/shared-utils/objects";
    import { isDetailKey } from "../../lib/client/bsl-item";
    import { getBSLContext } from "../../lib/client/contexts/bsl";
    import CompareTable from "./CompareTable.svelte";
    import FoodCard from "./FoodCard.svelte";
    import Header from "./Header.svelte";

    const bsl = getBSLContext();
    const bslData = $derived(bsl.data);

    let nutrients = $state<SelectableItem[]>([]);
    const selectedNutrients = $derived(nutrients.filter(n => n.isSelected).map(n => n.name));

    let topNutrients = $state<Record<string, SelectableItem>>({});
    const selectedTopNutrients = $derived(
        Object.values(topNutrients)
            .filter(n => n.isSelected)
            .map(n => n.name),
    );

    const defaultSelectedNutrients = new Set<BSLItemPaths>([
        "energy.energy_kcal",
        "protein_g",
        "carbohydrates.available_total_g",
        "fat_total_g",
    ]);

    $effect(() => {
        nutrients = getFlattenedKeys(bslData[0] || {})
            .filter(isDetailKey)
            .map(name => ({
                name,
                isSelected: defaultSelectedNutrients.has(name as BSLItemPaths),
            }));

        topNutrients = [
            ...new Set(bslData.flatMap((item: BSLItem) => item.topNutrients || [])),
        ].reduce((all, name) => ({ ...all, [name]: { name, isSelected: false } }), {});
    });

    let topNutrientFilterMode = $state<"any" | "all">("any");

    let searchQuery = $state("");
    const searchResults = $derived.by(() => {
        const query = searchQuery.replaceAll(" ", "").toLowerCase();
        let tmpItems = bslData;
        if (query) {
            tmpItems = tmpItems.filter(item => item._searchStr.includes(query));
        }

        function itemMatchesTopNutrients(item: BSLItem) {
            if (!selectedTopNutrients.length) {
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

        return tmpItems.filter(item => itemMatchesTopNutrients(item));
    });

    let compareMode = $state(false);

    const compareItems = $derived(bslData.filter(item => item.isSelected));
</script>

<div
    class="
        flex h-screen flex-col bg-gray-50 font-sans text-gray-800
        dark:bg-gray-900 dark:text-gray-100
    ">
    <Header
        bind:searchQuery
        bind:compareMode
        bind:topNutrientFilterMode
        {nutrients}
        topNutrients={Object.values(topNutrients)}
        selectedItems={compareItems.length} />
    <main
        class="
            relative flex-1 overflow-hidden bg-gray-50
            dark:bg-gray-950
        ">
        <div class="mx-auto size-full max-w-7xl">
            {#if compareMode}
                <CompareTable {compareItems} {selectedNutrients} />
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
                            <FoodCard {item} {topNutrients} />
                        {/snippet}
                    </VirtualList>
                </div>
            {/if}
        </div>
    </main>
</div>
