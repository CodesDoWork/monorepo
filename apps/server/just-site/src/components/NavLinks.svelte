<script lang="ts">
    import { clsx } from "clsx";
    import { config } from "../config";
    import { onMount } from "svelte";

    const { routeLinks } = config;
    let currentRoute = undefined;
    onMount(() => {
        const path = window.location.pathname;
        currentRoute = routeLinks.find(r => r.route === path);
    });

    let className = ""
    export { className as class }
    export let liClass = "";
    export let aClass = "";
</script>
<ol class={className} style={`--hover-color: ${currentRoute?.color};`}>
    {#each routeLinks as routeLink, idx (idx)}
        <li style={`animation-delay: ${idx * 0.1}s;`}
            class={liClass}>
            <a href={routeLink === currentRoute ? "#" : routeLink.route}
               class={clsx(routeLink === currentRoute && "font-bold underline", "mx-1 rounded hover:bg-[var(--hover-color)] hover:text-black p-1 md:p-2 transition-colors dark:text-white tracking-wide", aClass)}>{routeLink.label}</a>
        </li>
    {/each}
</ol>
