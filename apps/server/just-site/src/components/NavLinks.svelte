<script lang="ts">
    import { clsx } from "clsx";
    import { getRoutes } from "../stores/routes";

    const { routeLinks, currentRoute } = getRoutes();

    let className = "";
    export { className as class };
    export let liClass = "";
    export let aClass = "";
</script>
<ol class={className} style={`--hover-color: ${$currentRoute?.color};`}>
    {#each routeLinks as routeLink, idx (idx)}
        <li style={`animation-delay: ${idx * 0.1}s;`}
            class={liClass}>
            <a href={routeLink === $currentRoute ? "#" : routeLink.route}
               class={clsx(routeLink === $currentRoute && "font-bold underline", "font-mono mx-1 rounded hover:bg-[var(--hover-color)] hover:text-black p-1 md:p-2 transition-colors dark:text-white tracking-wide", aClass)}>{routeLink.label}</a>
        </li>
    {/each}
</ol>
