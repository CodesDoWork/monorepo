<script lang="ts">
    import type { PageData } from "./$types";
    import "../../../../../libs/branding/assets/css/tailwind.css";
    import tailwindConfig from "../../tailwind.config";
    import { useThemeStore } from "../stores/useThemeStore";

    export let data: PageData;
    const { siteInfo, currentRoute } = data;

    const themeStore = useThemeStore();
    $: themeColor = $themeStore === "dark" ? tailwindConfig.theme.extend.colors.primary[950] : tailwindConfig.theme.extend.colors.primary[500];

    const title = currentRoute ? `${currentRoute.name} | ${siteInfo.title}` : siteInfo.title;
</script>

<svelte:head>
    <title>{title}</title>
    <meta content="description" name={currentRoute?.description} />
    <meta content={siteInfo.keywords.join(" ")} name="keywords" />
    <meta content={themeColor} name="theme-color" />
    <meta content={title} property="og:title">
    <meta content="website" property="og:type" />
    <meta content={currentRoute?.description} property="og:description">
    <meta content="https://justinkonratt.com" property="og:url">
    <meta content="summary" name="twitter:card">
    <meta content={title} property="og:site_name">
    <!-- <meta content="<needed>" property="og:image"> -->
    <!-- <meta content="Alt text for image" name="twitter:image:alt"> -->
</svelte:head>

<div class="relative overflow-x-hidden bg-gradient-to-b from-primary-400 from-5% to-secondary-400 to-95% dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <slot />
</div>
