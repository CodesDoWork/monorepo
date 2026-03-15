import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
    try {
        return await getAssetFromKV(event);
    } catch {
        const url = new URL(event.request.url);
        if (url.pathname === "/") {
            return new Response("Infinite Redirect", { status: HttpStatusCode.LOOP_DETECTED });
        }

        url.pathname = "/";
        return Response.redirect(url, HttpStatusCode.TEMPORARY_REDIRECT);
    }
}
