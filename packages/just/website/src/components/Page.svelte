<script lang="ts">
    import type { JustSiteRoutes, SocialNetworks } from "@cdw/monorepo/just-cms-types";
    import type { ComponentProps } from "svelte";
    import type { PageInfo } from "../types/frontend";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import tailwindConfig from "../../tailwind.config";
    import { useRoutes } from "../stores/useRoutes";
    import { useThemeStore } from "../stores/useThemeStore";
    import BackToTop from "./BackToTop.svelte";
    import Footer from "./Footer.svelte";
    import Header from "./Header.svelte";
    import Title from "./Title.svelte";

    const theme = useThemeStore();
    const colors = tailwindConfig.theme.extend.colors as Record<string, Record<number, string>>;
    $: themeColor = $theme === "dark" ? colors.primary[950] : colors.primary[400];

    export let siteInfo: PageInfo;
    export let routes: JustSiteRoutes[];
    export let backButton = false;
    export let header: ComponentProps<Header> = {
        title: siteInfo.title,
        routes,
        theme,
        backButton,
    };
    export let title: ComponentProps<Title> = {};
    export let loading = false;

    const { currentRoute, previousRoute } = useRoutes(routes);
    $: pageTitle = $currentRoute ? `${$currentRoute.name} | ${siteInfo.title}` : siteInfo.title;

    $: mainClass = clsx(
        "text-black dark:text-white transition-colors",
        $currentRoute?.is_hero === false && "bg-white dark:bg-opacity-0",
        "pt-4 pb-16 md:px-8 flex-1 w-full px-8 sm:px-1/20 lg:px-1/10",
        $currentRoute?.is_hero === false && $previousRoute?.is_hero && "animate-fadeInSubtle",
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
    <meta content={pageTitle} property="og:title" />
    <meta content={$currentRoute?.description} property="og:description" />
    <meta content={pageTitle} property="og:site_name" />
    <meta content={themeColor} name="theme-color" />
</svelte:head>
<div class="flex min-h-screen flex-col" style={`--page-color: ${$currentRoute?.color};`}>
    <Header {...header} />
    <main class={mainClass}>
        <Title {...title} />
        {#if loading}
            <div class="animate-fadeInTopSubtle m-auto mt-24 flex w-min items-center gap-3">
                <Icon icon="eos-icons:bubble-loading" />
                <span class="text-2xl font-bold">Loading</span>
            </div>
        {:else}
            <slot />
        {/if}
    </main>
    <Footer {...footerProps} />
    <BackToTop />
</div>
