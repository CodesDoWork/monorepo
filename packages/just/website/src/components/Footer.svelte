<script lang="ts">
    import type { Readable } from "svelte/store";
    import type { Route } from "../routes/types";
    import { clsx } from "clsx";
    import { slide } from "svelte/transition";
    import Link from "./Link.svelte";

    interface Props {
        class?: string;
        licenseType?: string;
        licenseUrl?: string;
        projectUrl?: string;
        projectPlatform?: string;
        currentRoute: Readable<Route>;
    }

    const {
        class: className = "",
        licenseType = "",
        licenseUrl = "",
        projectUrl = "",
        projectPlatform = "",
        currentRoute,
    }: Props = $props();

    let isVisible = $state(false);
    currentRoute.subscribe(route => {
        isVisible = !route.isHero;
    });

    const footerClass = $derived(
        clsx(
            "select-none px-8 py-4 shadow",
            "text-center font-mono",
            "dark:bg-primary-500 bg-black bg-opacity-20 text-white transition-colors dark:bg-opacity-20",
            className,
        ),
    );

    const linkClass =
        "!text-black dark:!text-brandOrange-500 hover:!bg-brandOrange-500 hover:!text-black";
</script>

{#if isVisible}
    <footer transition:slide class={footerClass}>
        &copy; Justin Konratt {new Date().getFullYear()} - Licensed under
        <Link class={linkClass} href={licenseUrl} title="License">{licenseType}</Link>
        - View on
        <Link class={linkClass} href={projectUrl} title="Project">{projectPlatform}</Link>
    </footer>
{/if}
