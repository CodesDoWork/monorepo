<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";
    import { Footer } from "../components/footer";
    import { Header } from "../components/header";
    import { setNavigationContext } from "../contexts/navigation";
    import { getRoutes } from "../states/routes.svelte";
    import { createColors, createCssVariables } from "../utils/css";
    import "../tailwind.css";

    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const { settings, currentRoute, routes } = data;

    const nav = getRoutes(routes, currentRoute);
    setNavigationContext(nav);

    const colors = createColors({
        primary: settings.project_color,
        logoBg: settings.logoBackgroundColor,
    });
</script>

<svelte:head>
    <meta content="" name="keywords" />
    <meta content="https://agrarservicenordost.de" property="og:url" />
</svelte:head>

<div
    style={createCssVariables(colors)}
    class="
        relative grid min-h-screen grid-rows-[min-content_1fr_min-content] overflow-x-hidden
        dark:bg-(--primary-950) dark:text-white
    ">
    {#if nav.currentRoute.isHero !== true}
        <Header {data} currentRoute={nav.currentRoute} />
    {/if}
    <main>
        {@render children?.()}
    </main>
    <Footer {data} />
</div>
