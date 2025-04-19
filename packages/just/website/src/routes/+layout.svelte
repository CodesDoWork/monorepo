<script lang="ts">
    import type { Snippet } from "svelte";
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import tailwindConfig from "../../tailwind.config";
    import BackToTop from "../components/BackToTop.svelte";
    import BlurContent from "../components/BlurContent.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Title from "../components/Title.svelte";
    import { getRoutes } from "../stores/routes.svelte";
    import { getTheme, Theme } from "../stores/theme.svelte";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        data: PageData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const {
        siteInfo,
        routes,
        currentRoute: serverRoute,
        privacyPolicyRoute,
        currentLanguage,
        serverRoutes,
        languages,
    } = data;

    const nav = getRoutes(routes, serverRoutes, serverRoute);

    const pageTitle = $derived(
        nav.currentRoute.name === siteInfo.name
            ? siteInfo.name
            : `${nav.currentRoute.name} | ${siteInfo.name}`,
    );

    const theme = getTheme();
    const colors = tailwindConfig.theme.extend.colors as Record<string, Record<number, string>>;
    const themeColor = $derived(
        theme.displayedTheme === Theme.Dark ? colors.primary[950] : colors.primary[400],
    );

    const mainClass = $derived(
        clsx(
            "text-black transition-colors dark:text-white",
            nav.currentRoute.isHero === false && "bg-white dark:bg-opacity-0",
            "sm:px-1/20 lg:px-1/10 w-full flex-1 px-8 pb-16 pt-4 md:px-8",
            nav.currentRoute.isHero === false &&
                nav.previousRoute?.isHero &&
                "animate-fadeInSubtle",
        ),
    );
</script>

<svelte:head>
    <!-- eslint-disable svelte/indent -->
    <script>
        (function () {
            const theme = localStorage.getItem("theme");
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (theme === "dark" || (!theme && systemPrefersDark)) {
                document.documentElement.classList.add("dark");
            }
        })();
    </script>
    <!-- eslint-enable svelte/indent -->

    <title>{pageTitle}</title>
    <meta content="description" name={nav.currentRoute.description} />
    <meta content={pageTitle} property="og:title" />
    <meta content={nav.currentRoute.description} property="og:description" />
    <meta content={pageTitle} property="og:site_name" />
    <meta content={themeColor} name="theme-color" />
    <meta content={siteInfo.keywords} name="keywords" />
    <meta content="website" property="og:type" />
    <meta content="https://justinkonratt.com" property="og:url" />
</svelte:head>

<div
    class={clsx(
        "from-primary-400 to-secondary-400 dark:from-primary-950 dark:to-secondary-950",
        "bg-gradient-to-b from-5% to-95% transition-colors",
        "relative overflow-x-hidden",
        "flex min-h-screen flex-col",
    )}
    style={`--page-color: ${nav.currentRoute?.color};`}>
    <Header
        title={siteInfo.name}
        {routes}
        {theme}
        currentRoute={nav.currentRoute}
        {currentLanguage}
        {languages} />
    <main class={mainClass}>
        <Title currentRoute={nav.currentRoute} />
        <BlurContent currentRoute={nav.currentRoute}>
            {@render children?.()}
        </BlurContent>
    </main>
    <BlurContent currentRoute={nav.currentRoute}>
        <Footer
            copyright={siteInfo.name}
            licenseType={siteInfo.projectLicense}
            licenseUrl={siteInfo.projectLicenseUrl}
            projectPlatform={siteInfo.projectPlatform.name}
            projectUrl={siteInfo.projectUrl}
            texts={siteInfo}
            currentRoute={nav.currentRoute}
            {privacyPolicyRoute} />
    </BlurContent>
    <BackToTop text={siteInfo.backToTop} />
</div>
