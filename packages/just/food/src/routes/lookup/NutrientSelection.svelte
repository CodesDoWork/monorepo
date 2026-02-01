<script lang="ts">
    import { clsx } from "clsx";
    import { BSL_NAMES } from "../../lib/client/bsl-item";

    interface Props {
        topNutrientFilterMode: "any" | "all";
        selectedTopNutrients: Set<string>;
        allTopNutrients: string[];
        toggleTopNutrient: (nutrient: string) => void;
        clearTopNutrientFilters: () => void;
    }

    let {
        topNutrientFilterMode = $bindable(),
        selectedTopNutrients,
        allTopNutrients,
        toggleTopNutrient,
        clearTopNutrientFilters,
    }: Props = $props();
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
            col-span-full mb-2 flex items-center justify-between border-b pb-2 text-sm text-gray-500
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
                title={nut}>{BSL_NAMES[nut]}</span>
        </label>
    {/each}
</div>
