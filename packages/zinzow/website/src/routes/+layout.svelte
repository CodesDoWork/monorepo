<script lang="ts">
    import { Footer } from "../components/footer";
    import { Header } from "../components/header";
    import "../tailwind.css";
    import { createColors, createCssVariables } from "../utils/css";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
    const { settings, currentRoute } = data;
    const colors = createColors({
        primary: settings.project_color,
        secondary: settings.secondaryColor,
        accent: settings.accentColor,
    });
</script>

<svelte:head>
    <meta content={""} name="keywords" />
    <meta content="https://agrarservicenordost.de" property="og:url" />
</svelte:head>

<div
    style={createCssVariables(colors)}
    class="dark:bg-primary-950 relative grid min-h-screen grid-rows-[min-content_1fr_min-content] overflow-x-hidden dark:text-white">
    {#if $currentRoute?.isHero !== true}
        <Header {data} />
    {/if}
    <main>
        <slot />
    </main>
    <Footer {data} />
</div>
