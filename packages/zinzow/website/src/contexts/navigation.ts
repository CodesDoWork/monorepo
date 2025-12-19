import type { RouteFragment } from "../graphql/default/generated/graphql";
import { getContext, setContext } from "svelte";

const key = "navigation";
export interface NavigationContext {
    currentRoute?: RouteFragment;
}

export function setNavigationContext(context: NavigationContext) {
    setContext(key, context);
}

export function getNavigationContext(): NavigationContext {
    return getContext(key);
}
