<script lang="ts">
    import { CheckboxWithLabel, Input } from "@cdw/monorepo/shared-svelte-components/forms";
    import { clsx } from "clsx";
    import { useTrackFilters } from "./filters.svelte";

    interface Props {
        filters: ReturnType<typeof useTrackFilters>;
        class?: string;
    }

    const { filters, class: className }: Props = $props();
</script>

<div
    class={clsx(
        className,
        `
            dark:bg-primary-900/50
            bg-primary/50 grid h-fit w-full grid-cols-2 gap-2 rounded-md p-2 pb-6 shadow-lg
            *:text-xs
            sm:p-4
            sm:*:text-base
            md:gap-4
            lg:grid-cols-3
            xl:grid-cols-4
        `,
    )}>
    <h2
        class="
            hidden text-center font-bold
            2xl:block 2xl:text-xl
        ">
        Filters
    </h2>
    <Input bind:value={filters.freetextFilter} placeholder="Freetext" />
    <Input bind:value={filters.artistFilter} placeholder="Artist" />
    <Input bind:value={filters.titleFilter} placeholder="Title" />
    <Input bind:value={filters.genreFilter} placeholder="Genre" />
    <Input bind:value={filters.albumFilter} placeholder="Album" />
    <Input bind:value={filters.yearFilter} placeholder="Year" />
    <CheckboxWithLabel
        bind:checked={filters.showOnlyUnsavedFilter}
        id="showUnsavedOnly"
        class="
            col-span-2
            lg:col-span-3
            xl:col-span-4
            2xl:col-span-1
        ">
        Only show unselected
    </CheckboxWithLabel>
</div>
