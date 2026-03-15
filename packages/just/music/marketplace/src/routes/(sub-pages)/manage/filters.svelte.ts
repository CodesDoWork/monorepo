import type { IndexedTrack } from "./types";

const filters = [
    stringFilter("freetextFilter", freetext => t => matches(t.freetext, freetext)),
    stringFilter("artistFilter", artist => t => matches(t.meta.artist?.toLowerCase(), artist)),
    stringFilter("titleFilter", title => t => matches(t.meta.title?.toLowerCase(), title)),
    stringFilter(
        "genreFilter",
        genre => t => t.meta.genre?.some(g => matches(g.toLowerCase(), genre)) === true,
    ),
    stringFilter("albumFilter", album => t => matches(t.meta.album?.toLowerCase(), album)),
    stringFilter("yearFilter", year => t => matches(t.meta.year?.toString(), year)),
    stringFilter("trackFilter", track => t => matches(t.meta.trackNo?.toString(), track)),
    stringFilter("diskFilter", disk => t => matches(t.meta.diskNo?.toString(), disk)),
    booleanFilter("showOnlyUnsavedFilter", _ => t => !t.has),
] as const;

export function useTrackFilters<T extends IndexedTrack>(tracks: T[]) {
    const displayedTracks = $derived.by(() => {
        const predicates = filters.map(f => f.filter);
        return tracks.filter(track => {
            for (const p of predicates) {
                if (!p(track)) {
                    return false;
                }
            }
            return true;
        });
    });

    function reset() {
        filters.forEach(f => f.reset());
    }

    return {
        get displayedTracks() {
            return displayedTracks;
        },
        states: getFilterStates(filters),
        reset,
    };
}

type FilterType = string | boolean;
type FilterState<N extends string, T extends FilterType> = Record<N, T>;
interface Filter<N extends string, T extends FilterType> {
    name: N;
    reset: () => void;
    state: FilterState<N, T>;
    filter: (track: IndexedTrack) => boolean;
}

function stringFilter<N extends string>(
    name: N,
    getFilter: (filterValue: string) => (track: IndexedTrack) => boolean,
): Filter<N, string> {
    return createFilter(name, getFilter, "");
}

function booleanFilter<N extends string>(
    name: N,
    getFilter: (filterValue: boolean) => (track: IndexedTrack) => boolean,
): Filter<N, boolean> {
    return createFilter(name, getFilter, false);
}

function createFilter<N extends string, T extends FilterType>(
    name: N,
    getFilter: (filterValue: T) => (track: IndexedTrack) => boolean,
    initialValue: T,
): Filter<N, T> {
    let filterState = $state(initialValue);
    function reset() {
        filterState = initialValue;
    }

    const state = $derived({
        get [name]() {
            return filterState;
        },
        set [name](value: T) {
            filterState = value;
        },
    } as FilterState<N, T>);

    const predicate = $derived.by(() => {
        if (!filterState) {
            return () => true;
        }

        let filterValue = filterState;

        if (typeof filterValue === "string") {
            filterValue = filterValue.toLowerCase() as T;
        }

        return getFilter(filterValue);
    });

    return {
        name,
        reset,
        get state() {
            return state;
        },
        get filter() {
            return predicate;
        },
    };
}

function matches(value: string | undefined, filter: string) {
    return filter.endsWith(" ") ? value === filter.slice(0, -1) : value?.includes(filter) === true;
}

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

type FiltersState<F extends readonly Filter<string, FilterType>[]> = UnionToIntersection<
    F[number]["state"]
>;

function getFilterStates<F extends readonly Filter<string, FilterType>[]>(
    filterList: F,
): FiltersState<F> {
    const result = {};
    filterList.forEach(f => {
        Object.defineProperty(result, f.name, {
            get() {
                return f.state[f.name];
            },
            set(value: (typeof f.state)[string]) {
                f.state[f.name] = value;
            },
        });
    });

    return result as FiltersState<F>;
}
