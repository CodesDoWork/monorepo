import type { IndexedTrack } from "./types";

export function useTrackFilters<T extends IndexedTrack>(tracks: T[]) {
    let freetextFilter = $state("");
    let artistFilter = $state("");
    let titleFilter = $state("");
    let genreFilter = $state("");
    let albumFilter = $state("");
    let yearFilter = $state("");
    let showOnlyUnsavedFilter = $state(false);
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

        if (showOnlyUnsavedFilter) {
            tmpTracks = tmpTracks.filter(t => !t.has);
        }

        return tmpTracks;
    });

    function reset() {
        freetextFilter = "";
        artistFilter = "";
        titleFilter = "";
        genreFilter = "";
        albumFilter = "";
        yearFilter = "";
    }

    return {
        get displayedTracks() {
            return displayedTracks;
        },
        get freetextFilter() {
            return freetextFilter;
        },
        set freetextFilter(value: string) {
            freetextFilter = value;
        },
        get artistFilter() {
            return artistFilter;
        },
        set artistFilter(value: string) {
            artistFilter = value;
        },
        get titleFilter() {
            return titleFilter;
        },
        set titleFilter(value: string) {
            titleFilter = value;
        },
        get genreFilter() {
            return genreFilter;
        },
        set genreFilter(value: string) {
            genreFilter = value;
        },
        get albumFilter() {
            return albumFilter;
        },
        set albumFilter(value: string) {
            albumFilter = value;
        },
        get yearFilter() {
            return yearFilter;
        },
        set yearFilter(value: string) {
            yearFilter = value;
        },
        get showOnlyUnsavedFilter() {
            return showOnlyUnsavedFilter;
        },
        set showOnlyUnsavedFilter(value: boolean) {
            showOnlyUnsavedFilter = value;
        },
        reset,
    };
}
