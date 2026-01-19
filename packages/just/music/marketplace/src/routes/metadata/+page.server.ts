import type { Track } from "../../lib/common/track";
import type { PageServerLoad } from "./$types";
import { env } from "../../env";
import { getMusicLib } from "../../lib/server/headers";
import { getTracks, isStoreReady } from "../../lib/server/store";

type MetaKey = keyof Track["meta"];

const errorFields: MetaKey[] = ["title", "artist", "genre"];
const warnFields: MetaKey[] = ["year"];

export const load: PageServerLoad = async ({ request }) => {
    const userLib = getMusicLib(request);
    const tracks = getTracks()
        .map(t => {
            const { meta } = t;
            const errors: string[] = [];
            errorFields.forEach(f => {
                if (!meta[f] || (Array.isArray(meta[f]) && meta[f].length === 0)) {
                    errors.push(`<strong>${f}</strong> is missing`);
                }
            });

            const warnings: string[] = [];
            warnFields.forEach(f => {
                if (!meta[f]) {
                    warnings.push(`<strong>${f}</strong> is missing`);
                }
            });

            if (meta.bitrate) {
                if (meta.bitrate < 128_000) {
                    errors.push("<strong>Bitrate</strong> ciritcally low");
                } else if (meta.bitrate <= 192_000) {
                    warnings.push("<strong>Bitrate</strong> low");
                }
            }

            return {
                ...t,
                paths: t.paths.filter(p => p.startsWith(env.LIBS_DIR)),
                errors,
                warnings,
            };
        })
        .filter(t => t.errors.length || t.warnings.length)
        .sort((a, b) => (a.meta.title ?? "").localeCompare(b.meta.title ?? ""))
        .sort((a, b) => (a.meta.artist ?? "").localeCompare(b.meta.artist ?? ""))
        .sort((a, b) => b.warnings.length - a.warnings.length)
        .sort((a, b) => b.errors.length - a.errors.length);

    return { tracks, isStoreReady: isStoreReady(), userLib };
};
