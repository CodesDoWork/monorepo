<script lang="ts">
    import { clsx } from "clsx";
    import Link from "./Link.svelte";
    import { useRoutes } from "../stores/useRoutes";
    import type { JustSiteRoutes } from "../types/directus";

    let className = "";
    export { className as class };
    export let routes: JustSiteRoutes[];
    export let licenseType: string = "";
    export let licenseUrl: string = "";
    export let projectUrl: string = "";
    export let projectPlatform: string = "";

    const { currentRoute, previousRoute } = useRoutes(routes);

    let footerVisibility = "";
    $: if ($currentRoute?.is_hero) {
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

    const linkClass = "!text-black dark:!text-brandOrange-500 hover:!bg-brandOrange-500 hover:!text-black"
</script>

<footer class={footerClass}>
    &copy; Justin Konratt {new Date().getFullYear()} - Licensed under
    <Link class={linkClass} href={licenseUrl} title="License">{licenseType}</Link>
    - View on
    <Link class={linkClass} href={projectUrl} title="Project">{projectPlatform}</Link>
</footer>
