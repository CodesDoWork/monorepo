<script lang="ts">
    import type { FooterTextsFragment } from "../../graphql/default/generated/graphql";
    import type { Route } from "../../routes/types";
    import { clsx } from "clsx";
    import { slide } from "svelte/transition";
    import { Link } from "../texts";

    interface Props {
        class?: string;
        copyright: string;
        licenseType: string;
        licenseUrl: string;
        projectUrl: string;
        projectPlatform: string;
        currentRoute: Route;
        privacyPolicyRoute: Route;
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
        privacyPolicyRoute,
        texts,
    }: Props = $props();

    const isVisible = $derived(!currentRoute?.isHero);

    const footerClass = $derived(
        clsx(
            "px-8 py-4 shadow-sm select-none",
            "text-center font-mono",
            `
                dark:bg-primary-500/20
                bg-black/20 text-white transition-colors
            `,
            "text-sm",
            className,
        ),
    );

    const linkClass =
        "text-black! dark:!text-tertiary-500 hover:!bg-tertiary-500 hover:text-black! dark:hover:text-black!";
</script>

{#if isVisible}
    <footer transition:slide|global class={footerClass}>
        <div class="mb-1">
            &copy; {copyright}
            {new Date().getFullYear()} - {texts.licensedUnder}
            <Link class={linkClass} href={licenseUrl} title="License">{licenseType}</Link>
            {texts.license} - {texts.viewOn}
            <Link class={linkClass} href={projectUrl} title="Project">{projectPlatform}</Link>
            {texts.viewOnTail}
            <br />
        </div>
        <Link
            class={linkClass}
            href={privacyPolicyRoute.route}
            title={privacyPolicyRoute.shortDescription}>
            {privacyPolicyRoute.name}
        </Link>
    </footer>
{/if}
