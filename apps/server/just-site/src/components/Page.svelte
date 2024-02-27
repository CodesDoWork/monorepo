<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Header from "./Header.svelte";
    import Title from "./Title.svelte";
    import Footer from "./Footer.svelte";
    import { useRoutes } from "../stores/useRoutes";
    import { clsx } from "clsx";
    import BackToTop from "./BackToTop.svelte";
    import Icon from "@iconify/svelte";
    import Card from "./Card.svelte";

    export let header: ComponentProps<Header> = {};
    export let title: ComponentProps<Title> = {};
    export let loading = false;

    const { currentRoute, previousRoute } = useRoutes();

    $: mainClass = clsx(
        "text-black dark:text-white transition-colors",
        $currentRoute?.isHero === false && "bg-white dark:bg-opacity-0",
        "pt-4 pb-16 md:px-8 flex-1 w-full px-8 sm:px-1/20 lg:px-1/10",
        $currentRoute?.isHero === false && $previousRoute?.isHero && "animate-fadeInSubtle",
    );
</script>

<div class="min-h-screen flex flex-col" style={`--page-color: ${$currentRoute?.color};`}>
    <Header {...header} />
    <main class={mainClass}>
        <Title {...title} />
        {#if loading}
            <Card padding class="flex w-min mx-auto items-center gap-2">
            <Icon icon="eos-icons:bubble-loading" />
            <span class="text-lg font-bold">Loading</span>
            </Card>
        {:else}
            <slot />
        {/if}
    </main>
    <Footer />
    <BackToTop />
</div>
