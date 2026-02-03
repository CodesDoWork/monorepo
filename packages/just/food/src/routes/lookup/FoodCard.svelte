<script lang="ts">
    import type { ComponentProps } from "svelte";
    import type { BSLItem, NutrientPaths } from "../../lib/client/bsl-item";
    import type { SelectableItem } from "./types";
    import { Card, DataTree, Popup } from "@cdw/monorepo/shared-svelte-components/app";
    import { getValueByPath } from "@cdw/monorepo/shared-utils/objects";
    import { BSL_NAMES, isDetailKey } from "../../lib/client/bsl-item";
    import NutrientBatch from "./NutrientBatch.svelte";

    interface Props {
        item: BSLItem;
        topNutrients: Record<string, SelectableItem>;
    }

    const { item, topNutrients }: Props = $props();

    let showDetails = $state(false);

    const toogleTopNutrient = $derived((name: string) => {
        const topNutrient = topNutrients[name];
        if (topNutrient) {
            topNutrient.isSelected = !topNutrient.isSelected;
        }
    });

    interface PrimaryNutrientInfo extends Omit<ComponentProps<typeof NutrientBatch>, "value"> {
        path: NutrientPaths;
    }
    const primaryNutrients: PrimaryNutrientInfo[] = [
        { emoji: "🔥", path: "energy.energy_kcal", unit: "kcal", color: "accent" },
        { emoji: "🍗", path: "protein_g", unit: "g", color: "primary" },
        { emoji: "🍞", path: "carbohydrates.available_total_g", unit: "g", color: "tertiary" },
        { emoji: "🥑", path: "fat_total_g", unit: "g", color: "secondary" },
    ];
</script>

<Card action={{ text: "View Details", onclick: () => (showDetails = true) }}>
    <div class="pt-1">
        <input
            type="checkbox"
            bind:checked={item.isSelected}
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

        <div class="flex flex-wrap gap-2">
            {#each primaryNutrients as nutrient}
                <NutrientBatch {...nutrient} value={getValueByPath(item, nutrient.path)} />
            {/each}
            {#each item.topNutrients as nutrient}
                <button
                    onclick={() => toogleTopNutrient(nutrient)}
                    class="cursor-pointer"
                    title="Toggle nutrient filter">
                    <NutrientBatch
                        value="Top 3"
                        unit="% {BSL_NAMES[nutrient]}"
                        color="other"
                        selected={topNutrients[nutrient]?.isSelected} />
                </button>
            {/each}
        </div>
    </div>
</Card>

<Popup bind:isOpen={showDetails} title={item.description ?? ""}>
    {#snippet content()}
        <DataTree
            data={item}
            hasUnit
            filterEntries={([key, value]) =>
                value !== null && value !== undefined && isDetailKey(key)}
            translations={BSL_NAMES} />
    {/snippet}
    {#snippet actions()}
        <button
            onclick={() => (item.isSelected = !item.isSelected)}
            class="
                rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors
                hover:bg-white
                dark:border-gray-600 dark:text-gray-200
                dark:hover:bg-gray-800
            ">
            {item.isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
    {/snippet}
</Popup>
