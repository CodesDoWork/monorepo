<script lang="ts">
    import type { Snippet } from "svelte";
    import type { NavigationContext } from "../contexts/navigation";
    import type { LayoutData } from "./$types";
    import { Footer } from "../components/footer";
    import { Header } from "../components/header";
    import { setNavigationContext } from "../contexts/navigation";
    import { createColors, createCssVariables } from "../utils/css";
    import "../tailwind.css";

    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const { settings, currentRoute } = $derived(data);

    const nav: NavigationContext = {
        get currentRoute() {
            return currentRoute;
        },
    };
    setNavigationContext(nav);

    const colors = $derived(
        createColors({
            primary: settings.project_color,
            logoBg: settings.logoBackgroundColor,
            bg: settings.backgroundColor,
        }),
    );
</script>

<svelte:head>
    <meta content="" name="keywords" />
    <meta content="https://agrarservicenordost.de" property="og:url" />
</svelte:head>

<div
    style={createCssVariables(colors)}
    class="
        bg-bg relative grid min-h-screen grid-rows-[min-content_1fr_min-content] overflow-x-hidden
        dark:bg-bg-950 dark:text-white
    ">
    <Header {data} {currentRoute} />
    <main>
        {@render children?.()}
    </main>
    <Footer {data} {currentRoute} />
</div>
