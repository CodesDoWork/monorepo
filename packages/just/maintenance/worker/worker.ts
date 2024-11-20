import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
    try {
        return await getAssetFromKV(event);
    } catch (e) {
        const url = new URL(event.request.url);
        if (url.pathname === "/") {
            return new Response("Infinite Redirect", { status: 508 });
        }

        url.pathname = "/";
        return Response.redirect(url, 302);
    }
}
