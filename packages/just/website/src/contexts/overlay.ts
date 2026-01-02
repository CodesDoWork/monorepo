import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { getContext, setContext } from "svelte";

const key = "overlay";
export interface OverlayContext {
    img?: DirectusImageParams;
}

export function setOverlayContext(context: OverlayContext) {
    setContext(key, context);
}

export function getOverlayContext(): OverlayContext {
    return getContext(key);
}
