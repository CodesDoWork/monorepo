<script lang="ts">
    import { clsx } from "clsx";
    import { Drawer, Sidebar, SidebarWrapper } from "flowbite-svelte";
    import DarkmodeToggle from "./DarkmodeToggle.svelte";
    import Icon from "@iconify/svelte";
    import { sineInOut } from "svelte/easing";
    import NavLinks from "./NavLinks.svelte";
    import { useRoutes } from "../stores/useRoutes";
    import { config } from "../config";

    let className = "";
    export { className as class };

    const { currentRoute, previousRoute } = useRoutes();

    let itemVisibility = "";
    let headerVisibility = "";
    $: if ($previousRoute?.isHero === false) {
        if ($currentRoute?.isHero === false) {
            itemVisibility = "opacity-100";
            headerVisibility = "scale-100";
        } else {
            itemVisibility = "animate-fadeOutTopSubtle opacity-0";
            headerVisibility = "animate-shrink opacity-100 scale-100";
        }
    } else if ($currentRoute?.isHero === false) {
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
    };

</script>

<Drawer bind:hidden={navDrawerHidden}
        class="absolute z-20 block lg:hidden p-0 rounded-r-none rounded-l shadow-lg start-auto end-0 top-14 dark:bg-primary-950"
        transitionParams={transitionParams}>
    <Sidebar class="r-0">
        <SidebarWrapper class="dark:bg-primary-950 rounded-r-none rounded-l p-3">
            <NavLinks aClass="block text-black dark:text-white" liClass={"mb-2 animate-fadeInTopSubtle opacity-0"} />
        </SidebarWrapper>
    </Sidebar>
</Drawer>
<DarkmodeToggle class="absolute top-4 right-8 z-10" />
<header class={headerClass}>
    <a class={clsx("font-mono font-bold drop-shadow-md", itemVisibility)} href="/">{config.title}</a>
    <NavLinks class="hidden lg:flex" liClass={clsx("inline-block", itemVisibility)} />
    <button class="block lg:hidden active:scale-90" on:click={() => navDrawerHidden = !navDrawerHidden}>
        <Icon class="w-6 h-6" icon="material-symbols:menu" />
    </button>
</header>
