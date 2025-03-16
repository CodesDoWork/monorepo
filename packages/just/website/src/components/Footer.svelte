<script lang="ts">
    import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
    import { clsx } from "clsx";
    import { useRoutes } from "../stores/useRoutes";
    import Link from "./Link.svelte";

    interface Props {
        class?: string;
        routes: JustSiteRoutes[];
        licenseType?: string;
        licenseUrl?: string;
        projectUrl?: string;
        projectPlatform?: string;
    }

    const {
        class: className = "",
        routes,
        licenseType = "",
        licenseUrl = "",
        projectUrl = "",
        projectPlatform = "",
    }: Props = $props();

    const { currentRoute, previousRoute } = useRoutes(routes);

    let footerVisibility = $state("");
    $effect(() => {
        if ($currentRoute?.is_hero) {
            footerVisibility = "scale-0";
        } else if ($previousRoute?.is_hero === false) {
            footerVisibility = "scale-100";
        } else {
            footerVisibility = "animate-grow opacity-100 scale-100";
        }
    });

    const footerClass = $derived(
        clsx(
            "select-none px-8 py-4 shadow",
            "text-center font-mono",
            "dark:bg-primary-500 bg-black bg-opacity-20 text-white transition-colors dark:bg-opacity-20",
            "origin-bottom",
            footerVisibility,
            className,
        ),
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
