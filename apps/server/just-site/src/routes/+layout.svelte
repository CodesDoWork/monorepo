<script lang="ts">
    import "../../../../../libs/branding/assets/css/tailwind.css";
    import tailwindConfig from "../../tailwind.config";
    import { useThemeStore } from "../stores/themeStore";

    const themeStore = useThemeStore();
    $: themeColor = $themeStore === "dark" ? tailwindConfig.theme.extend.colors.primary[950] : tailwindConfig.theme.extend.colors.primary[500];
</script>

<svelte:head>
    <title>Hello Svelte</title>
    <meta content={themeColor} name="theme-color" />
</svelte:head>

<div class="relative overflow-x-hidden bg-gradient-to-b from-primary-400 from-5% to-secondary-400 to-95% dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <slot />
</div>
