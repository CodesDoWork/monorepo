<script lang="ts" generics="T">
    import type { Snippet } from "svelte";
    import { formatValue, getValueByPath } from "@cdw/monorepo/shared-utils/objects";
    import Table from "./Table.svelte";

    interface Props {
        title: string;
        info?: string;
        items: T[];
        attributes: string[];
        headerColHeading?: Snippet;
        headerCol?: Snippet<[number]>;
        itemHeaderRow?: Snippet<[T]>;
        itemCell?: Snippet<[T, string]>;
    }

    const {
        title,
        info,
        items,
        attributes,
        headerColHeading,
        headerCol,
        itemHeaderRow,
        itemCell,
    }: Props = $props();
</script>

{#snippet defaultHheaderCol(idx: number)}
    {attributes[idx]}
{/snippet}

{#snippet defaultItemCell(item: T, attr: string)}
    {formatValue(getValueByPath(item, attr))}
{/snippet}

<Table
    {title}
    {info}
    rows={attributes.length}
    cols={items.length}
    {headerColHeading}
    headerCol={headerCol ?? defaultHheaderCol}>
    {#snippet headerRow(idx)}
        {@const item = items[idx - Number(headerCol !== undefined)]}
        {#if item}
            {@render itemHeaderRow?.(item)}
        {:else}
            {headerColHeading}
        {/if}
    {/snippet}

    {#snippet cell({ row, col })}
        {@const item = items[col]}
        {@const attr = attributes[row]}
        {#if item && attr}
            {@render (itemCell ?? defaultItemCell)(item, attr)}
        {:else}
            {row}-{col}
        {/if}
    {/snippet}
</Table>
