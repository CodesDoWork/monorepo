<script lang="ts">
    import { clsx } from "clsx";
    import { useRoutes } from "../stores/useRoutes";
    import { animationDelay } from "../helpers/animationDelay";
    import Link from "./Link.svelte";
    import type { JustSiteRoutes } from "@codesdowork/just-cms-types";

    let className = "";
    export { className as class };
    export let liClass = "";
    export let aClass = "";
    export let routes: JustSiteRoutes[];

    const { currentRoute } = useRoutes(routes);
</script>
<ol class={className}>
    {#each  routes.filter(r => r.in_nav) as routeLink, idx (idx)}
        <li style={animationDelay(idx)}
            class={liClass}>
            <Link noStyle title={routeLink.name} href={routeLink.route}
                  class={clsx(routeLink === $currentRoute && "font-bold underline", "leading-none font-mono mx-1 rounded hover:bg-[var(--page-color)] hover:text-black p-2 transition-colors tracking-wide", aClass)}>{routeLink.name}</Link>
        </li>
    {/each}
</ol>
