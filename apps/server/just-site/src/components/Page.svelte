<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Header from "./Header.svelte";
    import Title from "./Title.svelte";
    import Footer from "./Footer.svelte";
    import { useRoutes } from "../stores/useRoutes";
    import { clsx } from "clsx";
    import BackToTop from "./BackToTop.svelte";
    import Icon from "@iconify/svelte";
    import Card from "./Card.svelte";
    import type { JustSiteInfo, JustSiteRoutes, SocialNetworks } from "../types/directus";
    import { useThemeStore } from "../stores/useThemeStore";
    import tailwindConfig from "../../tailwind.config";
    import Link from "./Link.svelte";

    const theme = useThemeStore();
    $: themeColor = $theme === "dark" ? tailwindConfig.theme.extend.colors.primary[950] : tailwindConfig.theme.extend.colors.primary[400];

    export let siteInfo: JustSiteInfo;
    export let routes: JustSiteRoutes[];
    export let header: ComponentProps<Header> = { title: siteInfo.title, routes, theme };
    export let title: ComponentProps<Title> = {};
    export let loading = false;
    export let backButton = false;

    const { currentRoute, previousRoute } = useRoutes(routes);
    $: pageTitle = $currentRoute ? `${$currentRoute.name} | ${siteInfo.title}` : siteInfo.title;

    $: mainClass = clsx(
        "text-black dark:text-white transition-colors",
        $currentRoute?.is_hero === false && "bg-white dark:bg-opacity-0",
        "pt-4 pb-16 md:px-8 flex-1 w-full px-8 sm:px-1/20 lg:px-1/10",
        $currentRoute?.is_hero === false && $previousRoute?.isHero && "animate-fadeInSubtle",
    );

    const footerProps = {
        licenseType: siteInfo.project_license,
        licenseUrl: siteInfo.project_license_url,
        projectUrl: siteInfo.project_url,
        projectPlatform: (siteInfo.project_platform as SocialNetworks).name,
        routes,
    };
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta content="description" name={$currentRoute?.description} />
    <meta content={pageTitle} property="og:title">
    <meta content={$currentRoute?.description} property="og:description">
    <meta content={pageTitle} property="og:site_name">
    <meta content={themeColor} name="theme-color" />
</svelte:head>
<div class="min-h-screen flex flex-col" style={`--page-color: ${$currentRoute?.color};`}>
    <Header {...header } />
    <main class={mainClass}>
        { #if backButton && $currentRoute !== undefined }
            <Link class="p-2 m-4 ml-[-1rem] inline-block lg:left-8 lg:absolute lg:top-14 !text-black dark:!text-white hover:!text-white hover:!bg-[var(--page-color)]" href={$currentRoute?.route} title={$currentRoute?.name}>
                <Icon icon="carbon:chevron-left" />
            </Link>
        {/if}
        <Title {...title} />
        {#if loading}
            <Card padding class="flex w-min mx-auto items-center gap-2">
                <Icon icon="eos-icons:bubble-loading" />
                <span class="text-lg font-bold">Loading</span>
            </Card>
        {:else}
            <slot />
        {/if}
    </main>
    <Footer {...footerProps} />
    <BackToTop />
</div>
