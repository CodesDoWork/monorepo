<script lang="ts">
    import "../../../../../libs/branding/assets/css/tailwind.css";
    import tailwindConfig from "../../tailwind.config";
    import { onMount } from "svelte";
    import { localStorageStore } from "../stores/localStorageStore";

    let theme = "";
    let themeStore = undefined;
    onMount(() => {
        themeStore = localStorageStore("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        themeStore.subscribe(value => {
            theme = value;
        });
    });

    $: themeColor = theme === "dark" ? tailwindConfig.theme.extend.colors.primary[950] : tailwindConfig.theme.extend.colors.primary[500];
</script>

<svelte:head>
    <title>Hello Svelte</title>
    <meta content={themeColor} name="theme-color" />
</svelte:head>

<div class="relative overflow-x-hidden bg-gradient-to-b from-primary-500 from-5% to-secondary-500 to-95% dark:from-primary-950 dark:to-secondary-950 min-h-screen transition-colors flex flex-col">
    <slot />
</div>
