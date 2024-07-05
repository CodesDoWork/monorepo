<script lang="ts">
    import { clsx } from "clsx";
    import { useRoutes } from "../stores/useRoutes";
    import { animationDelay } from "../helpers/animationDelay";
    import type { JustSiteRoutes } from "../types/directus";

    let className = "";
    export { className as class };
    export let liClass = "";
    export let aClass = "";
    export let routes: JustSiteRoutes[];

    const { currentRoute } = useRoutes(routes);
</script>
<ol class={className}>
    {#each routes as routeLink, idx (idx)}
        <li style={animationDelay(idx)}
            class={liClass}>
            <a href={routeLink === $currentRoute ? "#" : routeLink.route}
               class={clsx(routeLink === $currentRoute && "font-bold underline", "leading-none font-mono mx-1 rounded hover:bg-[var(--page-color)] hover:text-black p-1 md:p-2 transition-colors tracking-wide", aClass)}>{routeLink.name}</a>
        </li>
    {/each}
</ol>
