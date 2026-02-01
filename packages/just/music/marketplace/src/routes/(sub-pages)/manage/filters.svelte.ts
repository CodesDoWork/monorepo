import type { IndexedTrack } from "./types";

export function useTrackFilters<T extends IndexedTrack>(tracks: T[]) {
    let freetextFilter = $state("");
    let artistFilter = $state("");
    let titleFilter = $state("");
    let genreFilter = $state("");
    let albumFilter = $state("");
    let yearFilter = $state("");
    let trackFilter = $state("");
    let diskFilter = $state("");
    let showOnlyUnsavedFilter = $state(false);
    const displayedTracks = $derived.by(() => {
        let tmpTracks = tracks;

        function matches(value: string | undefined, filter: string) {
            return filter.endsWith(" ") ? value === filter.slice(0, -1) : value?.includes(filter);
        }

        if (freetextFilter) {
            tmpTracks = tmpTracks.filter(t => matches(t.freetext, freetextFilter.toLowerCase()));
        }

        if (artistFilter) {
            tmpTracks = tmpTracks.filter(t =>
                matches(t.meta.artist?.toLowerCase(), artistFilter.toLowerCase()),
            );
        }

        if (titleFilter) {
            tmpTracks = tmpTracks.filter(t =>
                matches(t.meta.title?.toLowerCase(), titleFilter.toLowerCase()),
            );
        }

        if (genreFilter) {
            tmpTracks = tmpTracks.filter(t =>
                t.meta.genre?.some(g => matches(g.toLowerCase(), genreFilter.toLowerCase())),
            );
        }

        if (albumFilter) {
            tmpTracks = tmpTracks.filter(t =>
                matches(t.meta.album?.toLowerCase(), albumFilter.toLowerCase()),
            );
        }

        if (yearFilter) {
            tmpTracks = tmpTracks.filter(t => matches(t.meta.year?.toString(), yearFilter));
        }

        if (trackFilter) {
            tmpTracks = tmpTracks.filter(t => matches(t.meta.trackNo?.toString(), trackFilter));
        }

        if (diskFilter) {
            tmpTracks = tmpTracks.filter(t => matches(t.meta.diskNo?.toString(), diskFilter));
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
        trackFilter = "";
        diskFilter = "";
        showOnlyUnsavedFilter = false;
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
        get trackFilter() {
            return trackFilter;
        },
        set trackFilter(value: string) {
            trackFilter = value;
        },
        get diskFilter() {
            return diskFilter;
        },
        set diskFilter(value: string) {
            diskFilter = value;
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
