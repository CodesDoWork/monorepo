<script lang="ts">
    import { clsx } from "clsx";
    import Link from "./Link.svelte";
    import { getRoutes } from "../stores/routes";

    let className = "";
    export { className as class };

    const { currentRoute, previousRoute } = getRoutes();

    let footerVisibility = "";
    $: if ($currentRoute?.isHero) {
        footerVisibility = "scale-0";
    } else if ($previousRoute?.isHero === false) {
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
