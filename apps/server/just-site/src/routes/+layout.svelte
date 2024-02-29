<script lang="ts">
    import "../../../../../libs/branding/assets/css/tailwind.css";
    import tailwindConfig from "../../tailwind.config";
    import { useThemeStore } from "../stores/useThemeStore";
    import { useRoutes } from "../stores/useRoutes";
    import { config } from "../config";

    const themeStore = useThemeStore();
    $: themeColor = $themeStore === "dark" ? tailwindConfig.theme.extend.colors.primary[950] : tailwindConfig.theme.extend.colors.primary[500];

    const { currentRoute } = useRoutes();
    const title = $currentRoute ? `${$currentRoute.label} | ${config.title}` : config.title;
</script>

<svelte:head>
    <title>{title}</title>
    <meta content="Your Passionate Dev and Student of Life" name={$currentRoute?.description} />
    <meta content={config.keywords} name="keywords" />
    <meta content={themeColor} name="theme-color" />
    <meta content={title} property="og:title">
    <meta content="website" property="og:type" />
    <meta content={$currentRoute?.description} property="og:description">
    <meta content="https://justinkonratt.com" property="og:url">
    <meta content="summary" name="twitter:card">
    <meta content={title} property="og:site_name">
    <!-- <meta content="<needed>" property="og:image"> -->
    <!-- <meta content="Alt text for image" name="twitter:image:alt"> -->
</svelte:head>

<div class="relative overflow-x-hidden bg-gradient-to-b from-primary-400 from-5% to-secondary-400 to-95% dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <slot />
</div>
