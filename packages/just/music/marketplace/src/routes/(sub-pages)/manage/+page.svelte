<script lang="ts">
    import type { PageProps } from "./$types";
    import type { IndexedTrack } from "./types";
    import { enhance } from "$app/forms";
    import { CheckboxWithLabel, Input } from "@cdw/monorepo/shared-svelte-components/forms";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { LoadingBarrier } from "../../../components/loading";
    import { getPairs } from "../../../lib/client/get-pairs";
    import { buttonClass } from "../../../lib/common/styles";
    import { useTrackFilters } from "./filters.svelte";
    import TrackCard from "./TrackCard.svelte";

    const { data }: PageProps = $props();
    const { isStoreReady, userLib } = $derived(data);

    let tracks: IndexedTrack[] = $state([]);
    const filters = $derived(useTrackFilters(tracks));
    const displayedPairs = $derived(getPairs(filters.displayedTracks));
    const allSelected = $derived(filters.displayedTracks.every(t => t.has));

    function handleSelectAll() {
        const has = !allSelected;
        filters.displayedTracks.forEach(t => (t.has = has));
    }

    $effect(() => {
        tracks = data.tracks;
    });
</script>

<LoadingBarrier isLoading={!isStoreReady}>
    <div
        class="
            grid h-full min-h-0 grid-cols-[1fr_auto_auto] grid-rows-[auto_1fr] items-center gap-x-6
            gap-y-4
        ">
        <span
            class="
                dark:text-secondary
                text-secondary-800 text-lg font-bold
            ">
            {userLib}
        </span>
        <p class="text-sm"><strong>{filters.displayedTracks.length}</strong> songs displayed</p>
        <button class={buttonClass} onclick={handleSelectAll}>
            {allSelected ? "Deselect" : "Select"} All
        </button>
        <form
            method="POST"
            action="?/save"
            class="col-span-3 h-full min-h-0"
            use:enhance={({ formData }) => {
                const selectedTracks: number[] = [];
                tracks.forEach(track => {
                    formData.append(track.idx.toString(), track.has.toString());
                    if (track.has) {
                        selectedTracks.push(track.idx);
                    }
                });

                return ({ update }) =>
                    update().then(() => {
                        filters.reset();
                        tracks = tracks.map(t => {
                            return { ...t, has: selectedTracks.includes(t.idx) };
                        });
                    });
            }}>
            <VirtualList itemContainerClass={clsx("last:pb-6")} items={displayedPairs}>
                {#snippet children(pair)}
                    <div class="grid grid-cols-2">
                        {#each pair as track}
                            <TrackCard bind:track={tracks[track.idx] as IndexedTrack} />
                        {/each}
                    </div>
                {/snippet}
            </VirtualList>
            <button type="submit" class={clsx(buttonClass, "fixed right-8 bottom-8")}>
                Save
            </button>
        </form>
    </div>
    <aside
        class="
            dark:bg-primary-900/50
            bg-primary/50 fixed top-1/2 right-8 h-fit w-64 -translate-y-1/2 space-y-4 rounded-md p-4
            pb-6 shadow-lg
        ">
        <h2 class="text-center text-xl font-bold">Filters</h2>
        <Input bind:value={filters.freetextFilter} placeholder="Freetext" />
        <Input bind:value={filters.artistFilter} placeholder="Artist" />
        <Input bind:value={filters.titleFilter} placeholder="Title" />
        <Input bind:value={filters.genreFilter} placeholder="Genre" />
        <Input bind:value={filters.albumFilter} placeholder="Album" />
        <Input bind:value={filters.yearFilter} placeholder="Year" />
        <CheckboxWithLabel bind:checked={filters.showOnlyUnsavedFilter} id="showUnsavedOnly">
            Only show unselected
        </CheckboxWithLabel>
    </aside>
</LoadingBarrier>
