<script lang="ts">
    import { clsx } from "clsx";
    import { afterNavigate } from "$app/navigation";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import { config } from "../config";
    import { onMount } from "svelte";

    let className = "";
    export { className as class };

    const { routeLinks } = config;

    let currentRoute = undefined;
    onMount(() => {
        const path = window.location.pathname;
        currentRoute = routeLinks.find(r => r.route === path);
    });

    let previousRoute = undefined;
    afterNavigate(({ from }) => {
        previousRoute = routeLinks.find(r => r.route === from.route.id);
    });

    $: headerClass = clsx(
        "flex justify-end py-4 px-8 gap-8",
        currentRoute?.header && [
            "shadow",
            "bg-black dark:bg-primary-500 bg-opacity-20 dark:bg-opacity-20 text-white",
            "transition-colors",
        ],
        className,
    );
</script>

<header class={headerClass}>
    {#if currentRoute?.header}
        <div style={`--hover-color: ${currentRoute?.color};`}>
            {#each routeLinks as routeLink, idx (idx)}
                <li style={`animation-delay: ${idx * 0.1}s;`} class={clsx("inline-block", previousRoute?.header || "animate-fadeInTopSubtle opacity-0")}>
                    <a href={routeLink === currentRoute ? "#" : routeLink.route}
                       class={clsx(routeLink === currentRoute && "font-bold underline", "mx-1 rounded hover:bg-[var(--hover-color)] hover:text-black p-2 transition-colors dark:text-white tracking-wide")}>{routeLink.label}</a>
                </li>
            {/each}
        </div>
    {/if}
    <DarkmodeToggle />
</header>
