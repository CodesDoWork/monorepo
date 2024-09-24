import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
    try {
        return await getAssetFromKV(event);
    } catch (e) {
        const url = new URL(event.request.url);
        url.pathname = "/";
        return Response.redirect(url, 302);
    }
}
