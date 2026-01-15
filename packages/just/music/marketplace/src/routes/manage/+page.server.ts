import type { Actions, PageServerLoad } from "./$types";
import { linkSync, rmSync } from "node:fs";
import { join } from "node:path";
import { env } from "../../env";
import { getSelectedTracks } from "../../lib/common/selected-tracks";
import { getMusicLib } from "../../lib/server/headers";
import { getTracks, isStoreReady } from "../../lib/server/store";

export const load: PageServerLoad = async ({ request }) => {
    const userLib = getMusicLib(request);
    return { tracks: getUserTracks(userLib), isStoreReady: isStoreReady(), userLib };
};

export const actions = {
    save: async ({ request }) => {
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
                const storePath = t.paths.find(path => path.startsWith(env.STORE_DIR));
                const filename = `${t.meta.artist || "Unknown Artist"} - ${t.meta.title || "Unknown Title"}.mp3`;
                const targetPath = join(userLib, filename);
                if (storePath) {
                    linkSync(storePath, targetPath);
                }
            }
        });
    },
} satisfies Actions;

function getUserTracks(userLib: string) {
    return getTracks()
        .toSorted((a, b) => (a.meta.title ?? "").localeCompare(b.meta.title ?? ""))
        .sort((a, b) => (a.meta.artist ?? "").localeCompare(b.meta.artist ?? ""))
        .map((t, idx) => {
            return {
                idx,
                ...t,
                has: t.paths.some(path => path.startsWith(userLib)),
            };
        });
}
