import type { Graph, Thing } from "schema-dts";
import { getContext, setContext } from "svelte";

const key = "jsonLD";
export interface JsonLdContext {
    things: Thing[];
}

export function setJsonLdContext(context: JsonLdContext) {
    setContext(key, context);
}

export function getJsonLdContext(): JsonLdContext {
    return getContext(key);
}

export function addJsonLdThings(things: Thing[]) {
    const context = getJsonLdContext();
    context.things = things;
}

export function stringifyJsonLd(json: Graph): string {
    return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
}
