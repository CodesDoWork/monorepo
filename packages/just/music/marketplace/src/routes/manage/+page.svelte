<script lang="ts">
    import type { PageProps } from "./$types";
    import type { IndexedTrack } from "./types";
    import { enhance } from "$app/forms";
    import { CheckboxWithLabel, Input } from "@cdw/monorepo/shared-svelte-components/forms";
    import { clsx } from "clsx";
    import { BackButton } from "../../components/buttons";
    import { LoadingBarrier } from "../../components/loading";
    import { H1 } from "../../components/texts";
    import { buttonClass } from "../../lib/common/styles";
    import { useTrackFilters } from "./filters.svelte";
    import TrackCard from "./TrackCard.svelte";

    const { data }: PageProps = $props();
    const { isStoreReady, userLib } = $derived(data);
    // svelte-ignore state_referenced_locally
    let tracks = $state(data.tracks);
    const filters = $derived(useTrackFilters(tracks));
    const allSelected = $derived(filters.displayedTracks.every(t => t.has));

    function handleSelectAll() {
        const has = !allSelected;
        filters.displayedTracks.forEach(t => (t.has = has));
    }
</script>

<BackButton />
<H1>Manage Songs</H1>
<LoadingBarrier isLoading={!isStoreReady}>
    <div class="grid grid-cols-[1fr_auto] items-center">
        <span
            class="
                dark:text-secondary
                text-secondary-800 text-lg font-bold
            ">
            {userLib}
        </span>
        <button class={buttonClass} onclick={handleSelectAll}>
            {allSelected ? "Deselect" : "Select"} All
        </button>
        <form
            method="POST"
            action="?/save"
            class="col-span-2"
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
                        tracks = tracks.map(t => ({ ...t, has: selectedTracks.includes(t.idx) }));
                    });
            }}>
            <ul class="mt-4 grid grid-cols-2 gap-4">
                {#each filters.displayedTracks as track (track.idx)}
                    <TrackCard bind:track={tracks[track.idx] as IndexedTrack} />
                {/each}
            </ul>
            <button type="submit" class={clsx(buttonClass, "fixed right-8 bottom-8")}>Save</button>
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
