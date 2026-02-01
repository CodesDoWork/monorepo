<script lang="ts">
    import type { BSLItem } from "../../lib/client/bsl-item";
    import { clsx } from "clsx";
    import { BSL_NAMES } from "../../lib/client/bsl-item";

    interface Props {
        item: BSLItem;
        setSelectedItem: (item: BSLItem | null) => void;
        compareSet: Set<string>;
        toggleCompareItem: (code: string) => void;
        toggleTopNutrient: (nutrient: string) => void;
        selectedTopNutrients: Set<string>;
    }

    const {
        item,
        setSelectedItem,
        compareSet,
        toggleCompareItem,
        toggleTopNutrient,
        selectedTopNutrients,
    }: Props = $props();
</script>

<div class="mb-4">
    <div
        class="
            dark:hover:border-primary-900
            flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4
            shadow-sm transition-shadow
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
                        🔥 {item.energy?.energy_kcal ?? 0}&thinsp;kcal
                    </span>
                    <span
                        class="
                            bg-secondary-50 text-secondary-700
                            dark:bg-secondary-900/30 dark:text-secondary-300
                            rounded-sm px-2 py-1
                        ">
                        🍗 {item.protein_g ?? 0}&thinsp;g
                    </span>
                    <span
                        class="
                            bg-tertiary-50 text-tertiary-700
                            dark:bg-tertiary-900/30 dark:text-tertiary-300
                            rounded-sm px-2 py-1
                        ">
                        🍞 {item.carbohydrates?.available_total_g ?? 0}&thinsp;g
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
                        <button
                            onclick={() => toggleTopNutrient(nutrient)}
                            class={clsx(
                                `cursor-pointer rounded-sm px-2 py-1 text-xs text-stone-700`,
                                selectedTopNutrients.has(nutrient)
                                    ? "bg-primary-600 text-white"
                                    : `
                                        bg-stone-100
                                        dark:bg-stone-950/30 dark:text-stone-300
                                    `,
                            )}
                            title="Toggle nutrient filter">
                            Top 3&thinsp;% {BSL_NAMES[nutrient]}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <button
            onclick={() => setSelectedItem(item)}
            class="
                bg-primary-50 text-primary-600
                hover:bg-primary-100
                dark:bg-primary-900/20 dark:text-primary-400
                dark:hover:bg-primary-900/40
                w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors
                md:w-auto
            ">
            View Details
        </button>
    </div>
</div>
