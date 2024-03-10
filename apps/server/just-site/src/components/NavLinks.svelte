<script lang="ts">
    import { clsx } from "clsx";
    import { useRoutes } from "../stores/useRoutes";
    import { animationDelay } from "../helpers/animationDelay";

    const { routeLinks, currentRoute } = useRoutes();

    let className = "";
    export { className as class };
    export let liClass = "";
    export let aClass = "";
</script>
<ol class={className}>
    {#each routeLinks as routeLink, idx (idx)}
        <li style={animationDelay(idx)}
            class={liClass}>
            <a href={routeLink === $currentRoute ? "#" : routeLink.route}
               class={clsx(routeLink === $currentRoute && "font-bold underline", "leading-none font-mono mx-1 rounded hover:bg-[var(--page-color)] hover:text-black p-1 md:p-2 transition-colors tracking-wide", aClass)}>{routeLink.label}</a>
        </li>
    {/each}
</ol>
