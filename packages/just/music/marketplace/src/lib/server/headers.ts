import { join } from "node:path";
import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";
import { error } from "@sveltejs/kit";
import { env } from "../../env";

export const MusicLibHeader = "X-Music-Lib";

export function getMusicLib(request: Request) {
    const userLib = request.headers.get(MusicLibHeader);
    if (!userLib) {
        error(HttpStatusCode.FORBIDDEN);
    }
    return join(env.LIBS_DIR, userLib);
}
