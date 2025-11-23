<script lang="ts">
    import type { LanguageFragment } from "../graphql/default/generated/graphql";
    import type { Route } from "../routes/types";
    import type { ThemeState } from "../states/theme.svelte";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { fade, slide } from "svelte/transition";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import LanguageToggle from "./LanguageToggle.svelte";
    import Link from "./Link.svelte";
    import NavLinks from "./NavLinks.svelte";

    interface Props {
        class?: string;
        title: string;
        routes: Route[];
        theme: ThemeState;
        backButton?: boolean;
        currentRoute: Route;
        currentLanguage: LanguageFragment;
        languages: LanguageFragment[];
    }

    const {
        class: className = "",
        title,
        routes,
        theme,
        backButton = false,
        currentRoute,
        currentLanguage,
        languages,
    }: Props = $props();

    const isVisible = $derived(!currentRoute?.isHero);

    const headerClass = $derived(
        clsx(
            `
                px-8 py-4 shadow
                lg:pr-40
            `,
            `
                dark:bg-primary-500/20
                bg-black/20 text-white transition-colors
            `,
            className,
        ),
    );

    let isMobileNavVisible = $state(false);
</script>

{#if isVisible}
    <header transition:slide class={headerClass}>
        <div transition:fade class="relative flex items-center justify-between">
            <div class="flex items-center">
                {#if backButton}
                    <Link
                        class="
                            m-0 mr-4 inline-block p-1 text-white!
                            hover:bg-(--page-color)! hover:text-white!
                        "
                        href={currentRoute?.route}
                        title={currentRoute?.name}>
                        <Icon icon="carbon:chevron-left" />
                    </Link>
                {/if}
                <a class={clsx("font-mono font-bold drop-shadow-md")} href="/">{title}</a>
            </div>
            <NavLinks
                class="
                    hidden
                    lg:flex
                "
                liClass={clsx("animate-fadeInTopSubtle inline-block opacity-0")}
                aClass="mx-1"
                {routes}
                {currentRoute} />
            <button
                class="
                    block
                    active:scale-90
                    lg:hidden
                "
                onclick={() => (isMobileNavVisible = !isMobileNavVisible)}>
                <Icon class="h-6 w-6" icon="material-symbols:menu" />
            </button>
            {#if isMobileNavVisible}
                <button
                    transition:fade
                    aria-label="backdrop"
                    class="fixed inset-0 z-20 h-screen w-screen bg-black/65"
                    onclick={() => (isMobileNavVisible = false)}>
                </button>
                <NavLinks
                    class="
                        dark:bg-primary-800
                        absolute top-12 -right-4 z-30 space-y-2 rounded bg-white py-2 text-right
                        shadow-lg
                    "
                    onLinkClick={() => (isMobileNavVisible = false)}
                    aClass="block text-black dark:text-white pr-4 pl-8"
                    liClass="animate-fadeInTopSubtle opacity-0"
                    {routes}
                    {currentRoute} />
            {/if}
        </div>
    </header>
{/if}

<div
    class="
        absolute top-4 right-[4.5rem] z-10 flex gap-4
        sm:right-20 sm:gap-6
        lg:right-8
    ">
    <LanguageToggle {currentRoute} {currentLanguage} {languages} />
    <DarkmodeToggle isOnHero={currentRoute?.isHero} {theme} />
</div>
