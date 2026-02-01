<script lang="ts">
    import type { PageProps } from "./$types";
    import type { IndexedTrack } from "./types";
    import { enhance } from "$app/forms";
    import { Button } from "@cdw/monorepo/shared-svelte-components/buttons";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { LoadingBarrier } from "../../../components/loading";
    import { decodeAndDecompress } from "../../../lib/client/compression";
    import { getPairs } from "../../../lib/client/get-pairs";
    import { displayTrack } from "../../../lib/common/track";
    import { useTrackFilters } from "./filters.svelte";
    import Filters from "./Filters.svelte";
    import TrackCard from "./TrackCard.svelte";

    const { data, form }: PageProps = $props();
    const { isStoreReady, userLib } = $derived(data);
    const { errors } = $derived(form || { errors: [] });

    let acknowledgedErrors = $state(false);

    let tracks: IndexedTrack[] = $state([]);
    const filters = $derived(useTrackFilters(tracks));
    const displayedPairs = $derived(getPairs(filters.displayedTracks));

    let filtersShown = $state(false);

    const allSelected = $derived(filters.displayedTracks.every(t => t.has));
    function handleSelectAll() {
        const has = !allSelected;
        filters.displayedTracks.forEach(t => (t.has = has));
    }

    $effect(() => {
        decodeAndDecompress<IndexedTrack[]>(data.tracks).then(data => (tracks = data));
    });

    $effect(() => {
        if (errors.length) {
            acknowledgedErrors = false;
        }
    });
</script>

{#if errors.length && tracks.length && !acknowledgedErrors}
    <dialog
        open
        onclick={() => (acknowledgedErrors = true)}
        class="
            absolute inset-0 z-50 flex size-full items-center justify-center bg-black/50 p-4
            text-black backdrop-blur-sm
            dark:text-white
        ">
        <ul
            class="
                dark:bg-primary-950
                bg-primary-500 border-primary flex list-disc flex-col gap-4 rounded-md border p-4
                pl-8
            ">
            {#each errors as error}
                {@const track = tracks[error.idx]}
                <li>
                    <p
                        class="
                            text-sm
                            md:text-base
                        ">
                        {track && displayTrack(track)}:
                        <span
                            class="
                                text-red-800
                                dark:text-red-600
                            ">
                            {error.msg}
                        </span>
                    </p>
                </li>
            {/each}
        </ul>
    </dialog>
{/if}

<LoadingBarrier isLoading={!isStoreReady}>
    <div></div>
    <div
        class="
            grid h-full min-h-0 grid-cols-[1fr_auto_auto] grid-rows-[auto_auto_1fr] items-center
            gap-x-4 gap-y-2
            md:grid-cols-[minmax(10rem,1fr)_auto_minmax(5rem,auto)_minmax(5rem,auto)] md:gap-x-6
            md:gap-y-4
            2xl:grid-rows-[auto_1fr]
        ">
        <span
            class="
                dark:text-secondary
                text-secondary-800 col-span-3 text-xs font-bold text-wrap wrap-anywhere
                sm:text-sm
                md:col-span-1 md:text-base
                lg:text-lg
            ">
            {userLib}
        </span>
        <p class="text-right text-sm text-wrap">
            <strong>{filters.displayedTracks.length}</strong> songs displayed
        </p>
        <Button
            class={clsx(
                `
                    text-sm
                    md:text-base
                    2xl:hidden
                `,
                !filtersShown && "outline-primary bg-transparent outline",
            )}
            onclick={() => (filtersShown = !filtersShown)}>
            Filters
        </Button>
        <Button
            class="
                text-sm
                md:text-base
            "
            onclick={handleSelectAll}>
            {allSelected ? "Deselect" : "Select"} All
        </Button>
        {#if filtersShown}
            <Filters
                {filters}
                class="
                    col-span-3
                    md:col-span-4
                    2xl:hidden
                " />
        {/if}
        <form
            method="POST"
            action="?/save"
            class="
                col-span-3 h-full min-h-0
                md:col-span-4
            "
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
        </form>
    </div>
    <div class="flex h-full -translate-y-[calc((100vh-100%)/2)] flex-col justify-center">
        <Filters
            {filters}
            class="
                hidden
                2xl:grid 2xl:grid-cols-1
            " />
    </div>
</LoadingBarrier>
