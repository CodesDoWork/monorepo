<script lang="ts">
    import Footer from "../components/footer/footer.svelte";
    import { Header } from "../components/header";
    import "../tailwind.css";
    import { createColors, createCssVariables } from "../utils/css";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { settings } = data;
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
    <Header {data} />
    <main>
        <slot />
    </main>
    <Footer {data} />
</div>
