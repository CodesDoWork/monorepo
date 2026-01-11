<script lang="ts">
    import type { PageProps } from "./$types";
    import { enhance } from "$app/forms";
    import { BackButton } from "../../components/buttons";
    import { LoadingBarrier } from "../../components/loading";
    import { H1 } from "../../components/texts";
    import { getSelectedTracks } from "../../lib/common/selected-tracks";
    import { inputClass } from "../../lib/common/styles";
    import { displayTrack } from "../../lib/common/track";

    const { data }: PageProps = $props();
    const { isStoreReady, userLib } = $derived(data);
    let { tracks } = $derived(data);

    let freetextFilter = $state("");
    let titleFilter = $state("");
    let artistFilter = $state("");
    let genreFilter = $state("");
    let albumFilter = $state("");
    let yearFilter = $state("");
    const displayedTracks = $derived.by(() => {
        let tmpTracks = tracks;

        if (freetextFilter) {
            tmpTracks = tmpTracks.filter(t =>
                JSON.stringify(t).toLowerCase().includes(freetextFilter.toLowerCase()),
            );
        }

        if (artistFilter) {
            tmpTracks = tmpTracks.filter(t =>
                t.meta.artist?.toLowerCase().includes(artistFilter.toLowerCase()),
            );
        }

        if (titleFilter) {
            tmpTracks = tmpTracks.filter(t =>
                t.meta.title?.toLowerCase().includes(titleFilter.toLowerCase()),
            );
        }

        if (genreFilter) {
            tmpTracks = tmpTracks.filter(t =>
                t.meta.genre?.some(g => g.toLowerCase().includes(genreFilter.toLowerCase())),
            );
        }

        if (albumFilter) {
            tmpTracks = tmpTracks.filter(t =>
                t.meta.album?.toLowerCase().includes(albumFilter.toLowerCase()),
            );
        }

        if (yearFilter) {
            tmpTracks = tmpTracks.filter(t => t.meta.year?.toString().includes(yearFilter));
        }

        return tmpTracks;
    });
</script>

<BackButton />
<H1>Manage Songs</H1>
<LoadingBarrier isLoading={!isStoreReady}>
    <span
        class="
            dark:text-secondary
            text-secondary-800 text-lg font-bold
        ">{userLib}</span>
    <form
        method="POST"
        action="?/save"
        use:enhance={({ formData }) => {
            tracks.forEach(track => {
                formData.delete(track.idx.toString());
                formData.append(track.idx.toString(), track.has.toString());
            });

            const selectedTracks = getSelectedTracks(formData);
            return ({ update }) =>
                update().then(() => {
                    freetextFilter = "";
                    titleFilter = "";
                    artistFilter = "";
                    genreFilter = "";
                    albumFilter = "";
                    yearFilter = "";

                    tracks = tracks.map(t => ({ ...t, has: selectedTracks.includes(t.idx) }));
                });
        }}>
        <ul class="mt-4 grid grid-cols-2 gap-4">
            {#each displayedTracks as track (track.idx)}
                <li class="grid">
                    <div
                        class="
                            w-fit cursor-pointer
                            *:cursor-pointer
                        ">
                        <input
                            type="checkbox"
                            id={track.idx.toString()}
                            name={track.idx.toString()}
                            bind:checked={track.has} />
                        <label class="select-none" for={track.idx.toString()}>
                            {displayTrack(track)}
                        </label>
                    </div>
                </li>
            {/each}
        </ul>
        <button
            type="submit"
            class="
                bg-primary fixed right-8 bottom-8 rounded-md p-2 text-white transition-colors
                hover:bg-primary-400
                dark:hover:bg-primary-600
            ">Save</button>
    </form>
    <aside
        class="
            dark:bg-primary-900/50
            bg-primary/50 fixed top-1/2 right-8 h-fit w-64 -translate-y-1/2 space-y-4 rounded-md p-4
            pb-6 shadow-lg
        ">
        <h2 class="text-center text-xl font-bold">Filters</h2>
        <input bind:value={freetextFilter} placeholder="Freetext" class={inputClass} />
        <input bind:value={artistFilter} placeholder="Artist" class={inputClass} />
        <input bind:value={titleFilter} placeholder="Title" class={inputClass} />
        <input bind:value={genreFilter} placeholder="Genre" class={inputClass} />
        <input bind:value={albumFilter} placeholder="Album" class={inputClass} />
        <input bind:value={yearFilter} placeholder="Year" class={inputClass} />
    </aside>
</LoadingBarrier>
