<script lang="ts">
    import type { Snippet } from "svelte";
    import type { JsonLdContext } from "../contexts/jsonld";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { byId } from "@cdw/monorepo/shared-utils/filters";
    import { clsx } from "clsx";
    import tailwindConfig from "../../tailwind.config";
    import BackToTop from "../components/BackToTop.svelte";
    import BlurContent from "../components/BlurContent.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Title from "../components/Title.svelte";
    import { setJsonLdContext, stringifyJsonLd } from "../contexts/jsonld";
    import { getRoutes } from "../states/routes.svelte";
    import { getTheme, Theme } from "../states/theme.svelte";
    import { privateRoute } from "./private/constants";
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
        allRoutes,
        baseUrl,
        about,
        layoutJsonLd,
    } = data;

    const nav = getRoutes(routes, serverRoutes, serverRoute);

    const currentRouteUrl = $derived(`${baseUrl}${nav.currentRoute?.route}`);
    const alternateLinks = $derived(
        allRoutes.find(byId(nav.currentRoute?.id))?.translations.map(t => ({
            hreflang: t.language.short,
            href: `${baseUrl}${t.route}`,
        })) ?? [],
    );

    const pageTitle = $derived(
        !nav.currentRoute || nav.currentRoute.name === siteInfo.name
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
            nav.currentRoute?.isHero === false && "bg-white dark:bg-opacity-0",
            "sm:px-1/20 lg:px-1/10 w-full flex-1 px-8 pb-16 pt-4 md:px-8",
            nav.currentRoute?.isHero === false &&
                nav.previousRoute?.isHero &&
                "animate-fadeInSubtle",
        ),
    );

    const jsonLdContext = $state<JsonLdContext>({ things: [] });
    setJsonLdContext(jsonLdContext);
    const jsonLdGraph = $derived({
        ...layoutJsonLd,
        "@graph": [...layoutJsonLd["@graph"], ...jsonLdContext.things],
    });
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
    <meta name="content-language" content={currentLanguage.short} />
    <meta name="robots" content={nav.currentRoute ? "index,follow" : "noindex"} />
    <meta name="theme-color" content={themeColor} />
    {#if nav.currentRoute}
        <link rel="canonical" href={currentRouteUrl} />
        <meta name="description" content={nav.currentRoute.description} />
        <meta name="keywords" content={nav.currentRoute.keywords.join(" ")} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={nav.currentRoute.description} />
        <meta property="og:url" content={currentRouteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={about.imageUrl} />
        <meta property="og:site_name" content={siteInfo.name} />
        <meta property="og:locale" content={currentLanguage.code.replace("-", "_")} />
        {#each languages as language}
            <meta property="og:locale:alternate" content={language.code.replace("-", "_")} />
        {/each}
        {@html stringifyJsonLd(jsonLdGraph)}
    {/if}
    {#each alternateLinks as alternateLink}
        <link rel="alternate" {...alternateLink} />
    {/each}
</svelte:head>

{#if page.route.id?.startsWith(privateRoute)}
    {@render children?.()}
{:else}
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
{/if}
