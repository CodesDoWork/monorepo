import type { Handle } from "@sveltejs/kit";
import { env } from "./env";
import { UserEmailHeader } from "./lib/server/headers";

export const handle: Handle = async ({ event, resolve }) => {
    if (env.NODE_ENV === "development" && env.DEV_USER_EMAIL) {
        event.request.headers.set(UserEmailHeader, env.DEV_USER_EMAIL);
    }

    return resolve(event);
};
