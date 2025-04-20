<script lang="ts">
    import type { Route } from "../routes/types";
    import { clsx } from "clsx";
    import { slide } from "svelte/transition";
    import { animationDelay } from "../shared/animationDelay";
    import Link from "./Link.svelte";

    interface Props {
        class?: string;
        liClass?: string;
        aClass?: string;
        routes: Route[];
        currentRoute: Route;
        onLinkClick?: (route: Route, event: MouseEvent) => void;
    }

    const {
        class: className = "",
        liClass = "",
        aClass = "",
        routes,
        currentRoute,
        onLinkClick,
    }: Props = $props();
</script>

<ol transition:slide class={className}>
    {#each routes.filter(r => r.inNav) as routeLink, idx (idx)}
        <li style={animationDelay(idx)} class={liClass}>
            <Link
                onclick={e => onLinkClick(routeLink, e)}
                noStyle
                title={routeLink.name}
                href={routeLink.route}
                class={clsx(
                    routeLink === currentRoute && "font-bold underline",
                    "rounded p-2 font-mono leading-none tracking-wide transition-colors duration-200 hover:bg-[var(--page-color)] hover:text-black",
                    aClass,
                )}>{routeLink.name}</Link>
        </li>
    {/each}
</ol>
