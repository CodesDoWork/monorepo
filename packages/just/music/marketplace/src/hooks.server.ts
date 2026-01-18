import type { Handle } from "@sveltejs/kit";
import { env } from "./env";
import { MusicLibHeader } from "./lib/server/headers";

export const handle: Handle = async ({ event, resolve }) => {
    if (env.NODE_ENV === "development") {
        event.request.headers.set(MusicLibHeader, "justin");
    }

    return resolve(event);
};
