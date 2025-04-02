<script lang="ts">
    import type { Readable, Writable } from "svelte/store";
    import type { Route } from "../routes/types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Drawer, Sidebar, SidebarWrapper } from "flowbite-svelte";
    import { sineInOut } from "svelte/easing";
    import { fade, slide } from "svelte/transition";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import Link from "./Link.svelte";
    import NavLinks from "./NavLinks.svelte";

    interface Props {
        class?: string;
        title: string;
        routes: Route[];
        theme: Writable<string>;
        backButton?: boolean;
        currentRoute: Readable<Route>;
    }

    const {
        class: className = "",
        title,
        routes,
        theme,
        backButton = false,
        currentRoute,
    }: Props = $props();

    let isVisible = $state(false);
    currentRoute.subscribe(route => {
        isVisible = !route.isHero;
    });

    const headerClass = $derived(
        clsx(
            "pr-18 py-4 pl-8 shadow lg:pr-24",
            "dark:bg-primary-500 bg-black bg-opacity-20 text-white transition-colors dark:bg-opacity-20",
            className,
        ),
    );

    let navDrawerHidden = $state(true);
    const transitionParams = {
        x: "100%",
        duration: 500,
        easing: sineInOut,
    } as any;
</script>

{#if isVisible}
    <header transition:slide class={headerClass}>
        <div transition:fade class="flex items-center justify-between">
            <div class="flex items-center">
                {#if backButton}
                    <Link
                        class="m-0 mr-4 inline-block p-1 !text-white hover:!bg-[var(--page-color)] hover:!text-white"
                        href={$currentRoute.route}
                        title={$currentRoute.name}>
                        <Icon icon="carbon:chevron-left" />
                    </Link>
                {/if}
                <a class={clsx("font-mono font-bold drop-shadow-md")} href="/">{title}</a>
            </div>
            <NavLinks
                class="hidden lg:flex"
                liClass={clsx("animate-fadeInTopSubtle inline-block opacity-0")}
                {routes}
                currentRoute={$currentRoute} />
            <button
                class="block active:scale-90 lg:hidden"
                onclick={() => (navDrawerHidden = !navDrawerHidden)}>
                <Icon class="h-6 w-6" icon="material-symbols:menu" />
            </button>
        </div>
    </header>
{/if}

<Drawer
    bind:hidden={navDrawerHidden}
    class="dark:bg-primary-950 absolute end-0 start-auto top-14 z-20 block rounded-l rounded-r-none border-b-2 border-l-2 border-gray-500 bg-gray-50 p-0 shadow-md lg:hidden"
    {transitionParams}>
    <Sidebar>
        <SidebarWrapper class="dark:bg-primary-950 rounded-l rounded-r-none p-2">
            <NavLinks
                onclick={() => (navDrawerHidden = true)}
                aClass="block text-black dark:text-white"
                liClass="mb-2 animate-fadeInTopSubtle opacity-0"
                {routes}
                currentRoute={$currentRoute} />
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<DarkmodeToggle class="absolute right-8 top-4 z-10" isOnHero={$currentRoute.isHero} {theme} />
