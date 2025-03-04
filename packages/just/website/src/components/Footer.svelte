<script lang="ts">
    import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
    import { clsx } from "clsx";
    import { useRoutes } from "../stores/useRoutes";
    import Link from "./Link.svelte";

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
    } else if ($previousRoute?.is_hero === false) {
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

    const linkClass =
        "!text-black dark:!text-brandOrange-500 hover:!bg-brandOrange-500 hover:!text-black";
</script>

<footer class={footerClass}>
    &copy; Justin Konratt {new Date().getFullYear()} - Licensed under
    <Link class={linkClass} href={licenseUrl} title="License">{licenseType}</Link>
    - View on
    <Link class={linkClass} href={projectUrl} title="Project">{projectPlatform}</Link>
</footer>
