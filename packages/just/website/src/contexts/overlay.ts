import { getContext, setContext } from "svelte";

const key = "overlay";
export interface OverlayContext {
    img?: string;
}

export function setOverlayContext(context: OverlayContext) {
    setContext(key, context);
}

export function getOverlayContext(): OverlayContext {
    return getContext(key);
}
