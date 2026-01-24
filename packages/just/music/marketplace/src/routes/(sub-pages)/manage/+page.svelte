<script lang="ts">
    import type { PageProps } from "./$types";
    import type { IndexedTrack } from "./types";
    import { enhance } from "$app/forms";
    import { Button } from "@cdw/monorepo/shared-svelte-components/buttons";
    import { CheckboxWithLabel, Input } from "@cdw/monorepo/shared-svelte-components/forms";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { LoadingBarrier } from "../../../components/loading";
    import { getPairs } from "../../../lib/client/get-pairs";
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
            grid h-full min-h-0 grid-cols-[minmax(10rem,1fr)_auto_minmax(5rem,auto)]
            grid-rows-[auto_auto_1fr] items-center gap-x-4 gap-y-2
            md:gap-x-6 md:gap-y-4
            xl:grid-rows-[auto_1fr]
        ">
        <span
            class="
                dark:text-secondary
                text-secondary-800 text-xs font-bold text-wrap wrap-anywhere
                sm:text-sm
                md:text-base
                lg:text-lg
            ">
            {userLib}
        </span>
        <p class="text-right text-sm text-wrap">
            <strong>{filters.displayedTracks.length}</strong> songs displayed
        </p>
        <Button
            class="
                text-sm
                md:text-base
            "
            onclick={handleSelectAll}>
            {allSelected ? "Deselect" : "Select"} All
        </Button>
        <div
            class="
                dark:bg-primary-900/50
                bg-primary/50 col-span-3 grid h-fit w-full grid-cols-2 gap-2 rounded-md p-2 pb-6
                shadow-lg
                *:text-xs
                sm:p-4
                sm:*:text-base
                md:gap-4
                lg:grid-cols-3
                xl:fixed xl:top-1/2 xl:right-8 xl:w-64 xl:-translate-y-1/2 xl:grid-cols-1
            ">
            <h2
                class="
                    col-span-2 text-center text-base font-bold
                    sm:text-lg
                    md:text-xl
                    lg:col-span-3
                    xl:col-span-1
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
                    xl:col-span-1
                ">
                Only show unselected
            </CheckboxWithLabel>
        </div>
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
                    <div
                        class="
                            grid
                            md:grid-cols-2
                        ">
                        {#each pair as track}
                            <TrackCard bind:track={tracks[track.idx] as IndexedTrack} />
                        {/each}
                    </div>
                {/snippet}
            </VirtualList>
            <Button
                type="submit"
                class="
                    fixed right-4 bottom-4
                    md:right-8 md:bottom-8
                ">
                Save
            </Button>
            >>>>>>> develop
        </form>
    </div>
</LoadingBarrier>
