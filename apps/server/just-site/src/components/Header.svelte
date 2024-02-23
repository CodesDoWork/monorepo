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
        previousRoute = routeLinks.find(r => r.route === from?.route.id);
    });

    $: headerClass = clsx(
        "grid lg:flex justify-between items-center gap-2 md:gap-4 lg:gap-8 py-4 px-8",
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
        <span class="text-lg font-mono font-bold drop-shadow-md">Justin Konratt</span>
        <div class="hidden lg:block flex-1" />
        <ol style={`--hover-color: ${currentRoute?.color};`} class="col-span-2">
            {#each routeLinks as routeLink, idx (idx)}
                <li style={`animation-delay: ${idx * 0.1}s;`}
                    class={clsx("inline-block", previousRoute?.header || "animate-fadeInTopSubtle opacity-0")}>
                    <a href={routeLink === currentRoute ? "#" : routeLink.route}
                       class={clsx(routeLink === currentRoute && "font-bold underline", "text-sm sm:text-base leading-8 mx-1 rounded hover:bg-[var(--hover-color)] hover:text-black p-1 md:p-2 transition-colors dark:text-white tracking-wide")}>{routeLink.label}</a>
                </li>
            {/each}
        </ol>
    {:else}
        <div class="flex-1" />
    {/if}
    <DarkmodeToggle class="row-start-1 col-start-2 place-self-end" />
</header>
