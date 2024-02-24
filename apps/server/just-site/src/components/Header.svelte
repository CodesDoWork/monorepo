<script lang="ts">
    import { clsx } from "clsx";
    import { Drawer, Sidebar, SidebarWrapper } from "flowbite-svelte";
    import { afterNavigate } from "$app/navigation";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import { config } from "../config";
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import { sineInOut } from "svelte/easing";
    import NavLinks from "./NavLinks.svelte";

    let className = "";
    export { className as class };

    const { routeLinks } = config;

    let currentRoute = undefined;
    onMount(() => {
        const path = window.location.pathname;
        currentRoute = routeLinks.find(r => r.route === path);
    });

    let previousRoute = undefined;
    afterNavigate(({ from }) => {
        previousRoute = routeLinks.find(r => r.route === from?.route.id);
    });

    let itemVisibility = "";
    let headerVisibility = "";
    $: if (previousRoute?.isHero === false) {
        if (currentRoute?.isHero === false) {
            itemVisibility = "opacity-100";
            headerVisibility = "scale-100";
        } else {
            itemVisibility = "animate-fadeOutTopSubtle opacity-0";
            headerVisibility = "animate-shrink opacity-100 scale-100";
        }
    } else if (currentRoute?.isHero === false) {
        itemVisibility = "animate-fadeInTopSubtle opacity-0";
        headerVisibility = "animate-grow opacity-100 scale-100";
    } else {
        itemVisibility = "opacity-0";
        headerVisibility = "scale-0";
    }

    $: headerClass = clsx(
        "flex justify-between items-center",
        "py-4 pl-8 pr-24 shadow",
        "bg-black dark:bg-primary-500 bg-opacity-20 dark:bg-opacity-20 text-white transition-colors",
        "origin-top",
        headerVisibility,
        className,
    );

    let navDrawerOpen = false;
    let transitionParams = {
        x: "100%",
        duration: 500,
        easing: sineInOut,
    };

</script>

<Drawer class="absolute z-20 block lg:hidden p-0 rounded-r-none rounded-l shadow-lg start-auto end-0 top-14"
        hidden={!navDrawerOpen}
        transitionParams={transitionParams}>
    <Sidebar class="r-0">
        <SidebarWrapper class="dark:bg-primary-950 rounded-r-none rounded-l">
            <NavLinks aClass="block w-full" liClass={"block my-1 animate-fadeInTopSubtle opacity-0"} />
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<DarkmodeToggle class="absolute top-4 right-8 z-10" />
<header class={headerClass}>
    <a class={clsx("font-mono font-bold drop-shadow-md", itemVisibility)} href="/">Justin Konratt</a>
    <NavLinks class="hidden lg:block" liClass={clsx("inline-block", itemVisibility)} />
    <button class="block lg:hidden active:scale-90" on:click={() => navDrawerOpen = !navDrawerOpen}>
        <Icon class="w-6 h-6" icon="material-symbols:menu" />
    </button>
</header>
