import type { Handle, HandleServerError } from "@sveltejs/kit";
import { getErrorData } from "./lib/server/error-data";

export const handle: Handle = async ({ event, resolve }) => {
    const { request } = event;
    const hasAccept = request.headers.has("accept") && request.headers.get("accept") !== "*/*";
    if (hasAccept) {
        if (request.headers.get("accept") === "application/json") {
            return resolve(event);
        }
    } else {
        // svelte returns 405 for accept */* for path "/"
        event.request.headers.set("accept", "text/html");
    }

    const response = await resolve(event);
    if (response.headers.get("content-type") === "text/html") {
        response.headers.set("cache-control", "public, s-maxage=300, stale-while-revalidate=86400");
    }

    return response;
};

interface SvelteKitError {
    status: number;
    text: string;
}

export const handleError: HandleServerError = async ({ error }) => {
    console.error(error);
    const { status, text } = error as SvelteKitError;
    return getErrorData(status, text);
};
