<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Header from "./Header.svelte";
    import Title from "./Title.svelte";
    import Footer from "./Footer.svelte";
    import { getRoutes } from "../stores/routes";
    import { clsx } from "clsx";

    export let header: ComponentProps<Header> = {};
    export let title: ComponentProps<Title> = {};

    const { currentRoute, previousRoute } = getRoutes();

    $: mainClass = clsx(
        "text-black dark:text-white transition-colors",
        $currentRoute?.isHero === false && "bg-white dark:bg-opacity-0",
        "pt-4 pb-16 md:px-8 flex-1 w-full px-8 sm:px-1/20 lg:px-1/10",
        $currentRoute?.isHero === false && $previousRoute?.isHero && "animate-fadeInSubtle"
    );
</script>

<div class="min-h-screen flex flex-col" style={`--page-color: ${$currentRoute?.color};`}>
    <Header {...header} />
    <main class={mainClass}>
        <Title {...title} />
        <slot />
    </main>
    <Footer />
</div>
