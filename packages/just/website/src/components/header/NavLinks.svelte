<script lang="ts">
    import type { Route } from "../../routes/types";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { slide } from "svelte/transition";
    import { Link } from "../texts";

    interface Props {
        class?: string;
        liClass?: string;
        aClass?: string;
        isMobile?: boolean;
        routes: Route[];
        currentRoute: Route;
        onLinkClick?: (route: Route, event: MouseEvent) => void;
    }

    const {
        class: className,
        liClass,
        aClass,
        isMobile,
        routes,
        currentRoute,
        onLinkClick,
    }: Props = $props();
</script>

<ol
    transition:slide={{ duration: isMobile ? 250 : 300, axis: isMobile ? "x" : "y" }}
    class={className}>
    {#each routes.filter(r => r.inNav) as routeLink, idx (idx)}
        <li style={animationDelay(idx)} class={liClass}>
            <Link
                onclick={e => onLinkClick?.(routeLink, e)}
                noStyle
                title={routeLink.shortDescription}
                href={routeLink.route}
                class={clsx(
                    routeLink === currentRoute && "font-bold underline",
                    `
                        hover:bg-pageColor hover:text-black
                        rounded p-2 font-mono leading-none tracking-wide transition-colors
                        duration-200
                    `,
                    aClass,
                )}>{routeLink.name}</Link>
        </li>
    {/each}
</ol>
