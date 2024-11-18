<script lang="ts">
    import { clsx } from "clsx";
    import { Drawer, Sidebar, SidebarWrapper } from "flowbite-svelte";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import Icon from "@iconify/svelte";
    import { sineInOut } from "svelte/easing";
    import NavLinks from "./NavLinks.svelte";
    import { useRoutes } from "../stores/useRoutes";
    import type { JustSiteRoutes } from "@codesdowork/just-cms-types";
    import type { Writable } from "svelte/store";
    import Link from "./Link.svelte";

    let className = "";
    export { className as class };
    export let title: string;
    export let routes: JustSiteRoutes[];
    export let theme: Writable<string>;
    export let backButton = false;

    const { currentRoute, previousRoute } = useRoutes(routes);

    let itemVisibility = "";
    let headerVisibility = "";
    $: if ($previousRoute?.is_hero === false) {
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

    $: headerClass = clsx(
        "flex justify-between items-center",
        "py-4 pl-8 pr-18 lg:pr-24 shadow",
        "bg-black dark:bg-primary-500 bg-opacity-20 dark:bg-opacity-20 text-white transition-colors",
        "origin-top",
        headerVisibility,
        className,
    );

    let navDrawerHidden = true;
    let transitionParams = {
        x: "100%",
        duration: 500,
        easing: sineInOut,
    } as any;
</script>

<header class={headerClass}>
    <div class="flex items-center">
        { #if backButton && $currentRoute !== undefined }
            <Link
                class="p-1 mr-4 m-0 inline-block !text-white hover:!text-white hover:!bg-[var(--page-color)]"
                href={$currentRoute?.route} title={$currentRoute?.name}>
                <Icon icon="carbon:chevron-left" />
            </Link>
        {/if}
        <a class={clsx("font-mono font-bold drop-shadow-md", itemVisibility)} href="/">{title}</a>
    </div>
    <NavLinks class="hidden lg:flex" liClass={clsx("inline-block", itemVisibility)} routes={routes} />
    <button class="block lg:hidden active:scale-90" on:click={() => navDrawerHidden = !navDrawerHidden}>
        <Icon class="w-6 h-6" icon="material-symbols:menu" />
    </button>
</header>
<Drawer bind:hidden={navDrawerHidden}
        class="absolute z-20 block lg:hidden p-0 rounded-r-none rounded-l shadow-md start-auto end-0 top-14 bg-gray-50 dark:bg-primary-950 border-gray-500 border-b-2 border-l-2"
        transitionParams={transitionParams}>
    <Sidebar>
        <SidebarWrapper class="dark:bg-primary-950 rounded-r-none rounded-l p-2">
            <NavLinks aClass="block text-black dark:text-white" liClass={"mb-2 animate-fadeInTopSubtle opacity-0"}
                      routes={routes} />
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<DarkmodeToggle class="absolute top-4 right-8 z-10" is_on_hero={$currentRoute?.is_hero} theme={theme} />
