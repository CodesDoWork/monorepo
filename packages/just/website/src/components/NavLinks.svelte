<script lang="ts">
    import type { Route } from "../routes/types";
    import { clsx } from "clsx";
    import { animationDelay } from "../shared/animationDelay";
    import Link from "./Link.svelte";

    interface Props {
        class?: string;
        liClass?: string;
        aClass?: string;
        routes: Route[];
        currentRoute: Route;
        onclick?: (route: Route, event: MouseEvent) => void;
    }

    const {
        class: className = "",
        liClass = "",
        aClass = "",
        routes,
        currentRoute,
        onclick,
    }: Props = $props();
</script>

<ol class={className}>
    {#each routes.filter(r => r.inNav) as routeLink, idx (idx)}
        <li style={animationDelay(idx)} class={liClass}>
            <Link
                onclick={e => onclick(routeLink, e)}
                noStyle
                title={routeLink.name}
                href={routeLink.route}
                class={clsx(
                    routeLink === currentRoute && "font-bold underline",
                    "mx-1 rounded p-2 font-mono leading-none tracking-wide transition-colors hover:bg-[var(--page-color)] hover:text-black duration-200",
                    aClass,
                )}>{routeLink.name}</Link>
        </li>
    {/each}
</ol>
