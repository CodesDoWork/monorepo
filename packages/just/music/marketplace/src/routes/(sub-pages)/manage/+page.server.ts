import type { Actions, PageServerLoad } from "./$types";
import type { IndexedTrack } from "./types";
import { existsSync, linkSync, rmSync } from "node:fs";
import { join } from "node:path";
import { env } from "../../../env";
import { getSelectedTracks } from "../../../lib/common/selected-tracks";
import { compressAndEncode } from "../../../lib/server/compression";
import { getMusicLib } from "../../../lib/server/headers";
import { getTracks, isStoreReady } from "../../../lib/server/store";

export const load: PageServerLoad = async ({ request }) => {
    const userLib = getMusicLib(request);
    return {
        tracks: compressAndEncode(getUserTracks(userLib)),
        isStoreReady: isStoreReady(),
        userLib,
        title: "Manage Songs",
    };
};

export const actions = {
    save: async ({ request }) => {
        const errors: TrackError[] = [];

        const userLib = getMusicLib(request);
        const tracks = getUserTracks(userLib);

        const formData = await request.formData();
        const selectedTracks = getSelectedTracks(formData);

        tracks.forEach(t => {
            if (t.has && !selectedTracks.includes(t.idx)) {
                const path = t.paths.find(path => path.startsWith(userLib));
                if (path) {
                    rmSync(path);
                }
            } else if (!t.has && selectedTracks.includes(t.idx)) {
                const error = addToStore(t, userLib);
                if (error) {
                    errors.push(error);
                }
            }
        });

        return { errors };
    },
} satisfies Actions;

interface TrackError {
    idx: number;
    msg: string;
}

function addToStore(t: IndexedTrack, userLib: string): TrackError | null {
    const storePath = t.paths.find(path => path.startsWith(env.STORE_DIR));
    const artist = t.meta.artist || "Unknown Artist";
    const title = t.meta.title || "Unknown Title";
    const album = t.meta.album ? ` [${t.meta.album}]` : "";
    const track = t.meta.trackNo ? ` #${t.meta.trackNo}` : "";
    const filename = `${artist} - ${title}${album}${track}.mp3`;
    const targetPath = join(userLib, filename);

    if (existsSync(targetPath)) {
        return { idx: t.idx, msg: "Song already exists" };
    }

    if (storePath) {
        linkSync(storePath, targetPath);
        return null;
    }

    return { idx: t.idx, msg: "No store path found" };
}

function getUserTracks(userLib: string): IndexedTrack[] {
    return getTracks()
        .toSorted((a, b) => (a.meta.title ?? "").localeCompare(b.meta.title ?? ""))
        .sort((a, b) => (a.meta.artist ?? "").localeCompare(b.meta.artist ?? ""))
        .map((t, idx) => {
            return {
                idx,
                ...t,
                has: t.paths.some(path => path.startsWith(userLib)),
                freetext: JSON.stringify(t).toLowerCase(),
            } satisfies IndexedTrack;
        });
}
