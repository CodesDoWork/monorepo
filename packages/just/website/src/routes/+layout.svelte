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
    import { useRoutes } from "../stores/routes";
    import { useThemeStore } from "../stores/useThemeStore";
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
        currentLanguage,
        serverRoutes,
        languages,
    } = data;

    const { currentRoute, previousRoute } = useRoutes(routes, serverRoutes, serverRoute);

    let pageTitle = $state("");
    currentRoute.subscribe(route => {
        pageTitle =
            route.name === siteInfo.name ? siteInfo.name : `${route.name} | ${siteInfo.name}`;
    });

    const theme = useThemeStore();
    const colors = tailwindConfig.theme.extend.colors as Record<string, Record<number, string>>;
    const themeColor = $derived($theme === "dark" ? colors.primary[950] : colors.primary[400]);

    const mainClass = $derived(
        clsx(
            "text-black transition-colors dark:text-white",
            $currentRoute.isHero === false && "bg-white dark:bg-opacity-0",
            "sm:px-1/20 lg:px-1/10 w-full flex-1 px-8 pb-16 pt-4 md:px-8",
            $currentRoute.isHero === false && $previousRoute?.isHero && "animate-fadeInSubtle",
        ),
    );
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta content="description" name={$currentRoute.description} />
    <meta content={pageTitle} property="og:title" />
    <meta content={$currentRoute.description} property="og:description" />
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
    style={`--page-color: ${$currentRoute?.color};`}>
    <Header title={siteInfo.name} {routes} {theme} {currentRoute} {currentLanguage} {languages} />
    <main class={mainClass}>
        <Title {currentRoute} />
        <BlurContent currentRoute={$currentRoute}>
            {@render children?.()}
        </BlurContent>
    </main>
    <BlurContent currentRoute={$currentRoute}>
        <Footer
            copyright={siteInfo.name}
            licenseType={siteInfo.projectLicense}
            licenseUrl={siteInfo.projectLicenseUrl}
            projectPlatform={siteInfo.projectPlatform.name}
            projectUrl={siteInfo.projectUrl}
            texts={siteInfo}
            {currentRoute} />
    </BlurContent>
    <BackToTop text={siteInfo.backToTop} />
</div>
