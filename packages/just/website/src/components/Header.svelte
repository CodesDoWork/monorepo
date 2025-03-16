<script lang="ts">
    import type { JustSiteRoutes } from "@cdw/monorepo/just-cms-types";

    import type { Writable } from "svelte/store";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Drawer, Sidebar, SidebarWrapper } from "flowbite-svelte";
    import { sineInOut } from "svelte/easing";
    import { useRoutes } from "../stores/useRoutes";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import Link from "./Link.svelte";
    import NavLinks from "./NavLinks.svelte";

    interface Props {
        class?: string;
        title: string;
        routes: JustSiteRoutes[];
        theme: Writable<string>;
        backButton?: boolean;
    }

    const { class: className = "", title, routes, theme, backButton = false }: Props = $props();

    const { currentRoute, previousRoute } = useRoutes(routes);

    let itemVisibility = $state("");
    let headerVisibility = $state("");
    $effect(() => {
        if ($previousRoute?.is_hero === false) {
            if ($currentRoute?.is_hero === false) {
                itemVisibility = "opacity-100";
                headerVisibility = "scale-100";
            } else {
                itemVisibility = "animate-fadeOutTopSubtle opacity-0";
                headerVisibility = "animate-shrink opacity-100 scale-100";
            }
        } else if ($currentRoute?.is_hero === false) {
            itemVisibility = "animate-fadeInTopSubtle opacity-0";
            headerVisibility = "animate-grow opacity-100 scale-100";
        } else {
            itemVisibility = "opacity-0";
            headerVisibility = "scale-0";
        }
    });

    const headerClass = $derived(
        clsx(
            "flex items-center justify-between",
            "pr-18 py-4 pl-8 shadow lg:pr-24",
            "dark:bg-primary-500 bg-black bg-opacity-20 text-white transition-colors dark:bg-opacity-20",
            "origin-top",
            headerVisibility,
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

<header class={headerClass}>
    <div class="flex items-center">
        {#if backButton && $currentRoute !== undefined}
            <Link
                class="m-0 mr-4 inline-block p-1 !text-white hover:!bg-[var(--page-color)] hover:!text-white"
                href={$currentRoute?.route}
                title={$currentRoute?.name}>
                <Icon icon="carbon:chevron-left" />
            </Link>
        {/if}
        <a class={clsx("font-mono font-bold drop-shadow-md", itemVisibility)} href="/">{title}</a>
    </div>
    <NavLinks class="hidden lg:flex" liClass={clsx("inline-block", itemVisibility)} {routes} />
    <button
        class="block active:scale-90 lg:hidden"
        onclick={() => (navDrawerHidden = !navDrawerHidden)}>
        <Icon class="h-6 w-6" icon="material-symbols:menu" />
    </button>
</header>
<Drawer
    bind:hidden={navDrawerHidden}
    class="dark:bg-primary-950 absolute end-0 start-auto top-14 z-20 block rounded-l rounded-r-none border-b-2 border-l-2 border-gray-500 bg-gray-50 p-0 shadow-md lg:hidden"
    {transitionParams}>
    <Sidebar>
        <SidebarWrapper class="dark:bg-primary-950 rounded-l rounded-r-none p-2">
            <NavLinks
                aClass="block text-black dark:text-white"
                liClass="mb-2 animate-fadeInTopSubtle opacity-0"
                {routes} />
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<DarkmodeToggle class="absolute right-8 top-4 z-10" is_on_hero={$currentRoute?.is_hero} {theme} />
