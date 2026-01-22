import type { Track } from "../../../lib/common/track";
import type { PageServerLoad } from "./$types";
import { env } from "../../../env";
import { getTracks, isStoreReady } from "../../../lib/server/store";

export const load: PageServerLoad = async () => {
    const tracks = getTracks();
    const keys = new Map<string, number[]>();
    tracks.forEach((t, idx) => {
        const key = `${t.meta.artist}-${t.meta.title}`.replace(/_/g, " ").toLowerCase();
        if (!keys.has(key)) {
            keys.set(key, [idx]);
        } else {
            keys.get(key)?.push(idx);
        }
    });

    function getTrack(idx: number): Track {
        const track = tracks[idx] as Track;
        return {
            ...track,
            paths: track.paths.filter(path => path.startsWith(env.LIBS_DIR)),
        };
    }

    const duplicates: Track[][] = [];
    keys.values()
        .filter(indices => indices.length > 1)
        .forEach(indices => duplicates.push(indices.map(getTrack)));

    return { duplicates, isStoreReady: isStoreReady(), title: "Duplicates" };
};
