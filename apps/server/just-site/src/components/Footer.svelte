<script lang="ts">
    import { clsx } from "clsx";
    import { afterNavigate } from "$app/navigation";
    import { config } from "../config";
    import { onMount } from "svelte";
    import Link from "./Link.svelte";

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

    let footerVisibility = "";
    $: if (currentRoute?.isHero) {
        footerVisibility = "scale-0";
    } else if (previousRoute?.isHero === false) {
        footerVisibility = "scale-100";
    } else {
        footerVisibility = "animate-grow opacity-100 scale-100";
    }

    $: footerClass = clsx(
        "py-4 px-8 shadow select-none",
        "font-mono text-center",
        "bg-black dark:bg-primary-500 bg-opacity-20 dark:bg-opacity-20 text-white transition-colors",
        "origin-bottom",
        footerVisibility,
        className,
    );
</script>

<footer class={footerClass}>
    &copy; Justin Konratt {new Date().getFullYear()} - Licensed under
    <Link external href="/hello" title="License">MIT</Link>
    - View on
    <Link external href="/hello" title="Project">GitHub</Link>
</footer>
