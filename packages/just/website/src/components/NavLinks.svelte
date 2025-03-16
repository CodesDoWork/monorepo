<script lang="ts">
    import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
    import { clsx } from "clsx";
    import { animationDelay } from "../helpers/animationDelay";
    import { useRoutes } from "../stores/useRoutes";
    import Link from "./Link.svelte";

    
    interface Props {
        class?: string;
        liClass?: string;
        aClass?: string;
        routes: JustSiteRoutes[];
    }

    let {
        class: className = "",
        liClass = "",
        aClass = "",
        routes
    }: Props = $props();

    const { currentRoute } = useRoutes(routes);
</script>

<ol class={className}>
    {#each routes.filter(r => r.in_nav) as routeLink, idx (idx)}
        <li style={animationDelay(idx)} class={liClass}>
            <Link
                noStyle
                title={routeLink.name}
                href={routeLink.route}
                class={clsx(
                    routeLink === $currentRoute && "font-bold underline",
                    "mx-1 rounded p-2 font-mono leading-none tracking-wide transition-colors hover:bg-[var(--page-color)] hover:text-black",
                    aClass,
                )}>{routeLink.name}</Link>
        </li>
    {/each}
</ol>
