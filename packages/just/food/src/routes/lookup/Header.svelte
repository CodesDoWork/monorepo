<script lang="ts">
    import type { SelectableItem } from "./types";
    import {
        ActionButton,
        Header,
        Search,
        Selection,
        SmallButton,
    } from "@cdw/monorepo/shared-svelte-components/app";
    import { clsx } from "clsx";
    import { BSL_NAMES } from "../../lib/client/bsl-item";

    interface Props {
        searchQuery: string;
        compareMode: boolean;
        topNutrientFilterMode: "any" | "all";
        nutrients: SelectableItem[];
        topNutrients: SelectableItem[];
        selectedItems: number;
    }

    let {
        searchQuery = $bindable(),
        compareMode = $bindable(),
        topNutrientFilterMode = $bindable(),
        nutrients,
        topNutrients,
        selectedItems,
    }: Props = $props();

    let isColumnSelectorOpen = $state(false);
    let isTopNutrientSelectorOpen = $state(false);
</script>

<Header title="BSL Food Explorer">
    {#snippet actions()}
        <Search bind:value={searchQuery} placeholder="Search foods (e.g., Apple, Cheese)..." />
        <div
            class="
                flex w-full gap-2
                md:w-auto
            ">
            <ActionButton
                icon="tabler:settings"
                iconOnlyWhenSmall
                onclick={() => (isColumnSelectorOpen = !isColumnSelectorOpen)}>
                Columns
            </ActionButton>
            <ActionButton
                icon="fluent:food-apple-20-regular"
                iconOnlyWhenSmall
                iconClass={clsx("size-5")}
                onclick={() => (isTopNutrientSelectorOpen = !isTopNutrientSelectorOpen)}>
                Top Nutrients
            </ActionButton>
            <ActionButton
                disabled={selectedItems < 1}
                onclick={() => (compareMode = !compareMode)}
                mode={compareMode ? "danger" : "primary"}>
                {#if compareMode}
                    Close
                {:else}
                    Compare ({selectedItems})
                {/if}
            </ActionButton>
        </div>
    {/snippet}
    {#snippet content()}
        {#if isColumnSelectorOpen}
            <Selection items={nutrients} class="max-h-80" translations={BSL_NAMES}>
                {#snippet header()}
                    Select data points to compare:
                {/snippet}
            </Selection>
        {/if}

        {#if isTopNutrientSelectorOpen}
            <Selection items={topNutrients} class="max-h-80" translations={BSL_NAMES}>
                {#snippet header()}
                    <div>Filter by Top Nutrients:</div>
                    <div class="mt-4 flex items-center gap-2">
                        <div class="text-xs text-gray-500">Mode:</div>
                        <SmallButton
                            onclick={() => (topNutrientFilterMode = "any")}
                            color={topNutrientFilterMode === "any" ? "primary" : "other"}>
                            Any
                        </SmallButton>
                        <SmallButton
                            onclick={() => (topNutrientFilterMode = "all")}
                            color={topNutrientFilterMode === "all" ? "primary" : "other"}>
                            All
                        </SmallButton>
                        <SmallButton
                            onclick={() => topNutrients.forEach(n => (n.isSelected = false))}
                            color="other"
                            class="ml-2">
                            Clear
                        </SmallButton>
                    </div>
                {/snippet}
            </Selection>
        {/if}
    {/snippet}
</Header>
