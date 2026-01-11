import { join } from "node:path";
import { error } from "@sveltejs/kit";
import { env } from "../../env";

export const MusicLibHeader = "X-Music-Lib";

export function getMusicLib(request: Request) {
    const userLib = request.headers.get(MusicLibHeader);
    if (!userLib) {
        error(403);
    }
    return join(env.LIBS_DIR, userLib);
}
