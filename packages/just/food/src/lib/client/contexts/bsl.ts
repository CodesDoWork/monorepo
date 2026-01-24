import type { BSLItem } from "../bsl-item";
import { getContext, setContext } from "svelte";

const bslContextKey = "bsl";

interface BSLContext {
    data: BSLItem[];
    isLoading: boolean;
}

export function setBSLContext(bslContext: BSLContext) {
    setContext(bslContextKey, bslContext);
}

export function getBSLContext(): BSLContext {
    return getContext(bslContextKey);
}
