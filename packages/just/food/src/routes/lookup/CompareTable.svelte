<script lang="ts">
    import type { BSLItem } from "../../lib/client/bsl-item";
    import { HorizontalItemTable } from "@cdw/monorepo/shared-svelte-components/table";
    import { BSL_NAMES } from "../../lib/client/bsl-item";

    interface Props {
        compareItems: BSLItem[];
        selectedColumns: string[];
    }

    const { compareItems, selectedColumns }: Props = $props();
</script>

<div class="h-full overflow-y-auto p-4">
    <HorizontalItemTable
        title="Comparison Table"
        info={`${compareItems.length} items`}
        items={compareItems}
        attributes={selectedColumns.values().toArray()}>
        {#snippet headerColHeading()}
            Attribute
        {/snippet}
        {#snippet itemHeaderRow(item)}
            <div class="flex flex-col">
                <span>{item.description}</span>
                <span class="text-xs font-normal text-gray-500">
                    {item.code}
                </span>
            </div>
        {/snippet}
        {#snippet headerCol(idx)}
            {@const attr = selectedColumns[idx]}
            {#if attr}
                {BSL_NAMES[attr]}
            {/if}
        {/snippet}
    </HorizontalItemTable>
</div>
