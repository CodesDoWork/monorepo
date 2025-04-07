<script lang="ts">
    import type { Readable } from "svelte/store";
    import type { FooterTextsFragment } from "../graphql/default/generated/gql";
    import type { Route } from "../routes/types";
    import { clsx } from "clsx";
    import { slide } from "svelte/transition";
    import Link from "./Link.svelte";

    interface Props {
        class?: string;
        copyright: string;
        licenseType: string;
        licenseUrl: string;
        projectUrl: string;
        projectPlatform: string;
        currentRoute: Readable<Route>;
        texts: FooterTextsFragment;
    }

    const {
        class: className = "",
        copyright,
        licenseType,
        licenseUrl,
        projectUrl,
        projectPlatform,
        currentRoute,
        texts,
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
    <footer transition:slide|global class={footerClass}>
        &copy; {copyright}
        {new Date().getFullYear()} - {texts.licensedUnder}
        <Link class={linkClass} href={licenseUrl} title="License">{licenseType}</Link>
        {texts.license} - {texts.viewOn}
        <Link class={linkClass} href={projectUrl} title="Project">{projectPlatform}</Link>
        {texts.viewOnTail}
    </footer>
{/if}
