<script lang="ts">
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import { writable } from "svelte/store";
    import type { LayoutData } from "../../routes/$types";
    import { ContentArea } from "../content-area";
    import { Logo } from "../logo";
    import MobileMenu from "./mobile-menu.svelte";
    import PopupNav from "./popup-nav.svelte";

    export let data: LayoutData;

    const { routes, currentRoute } = data;
    const routesInNav = routes.filter(r => r.showInHeader);

    let mobileMenuOpen = writable(false);
    const onMenuClick = () => mobileMenuOpen.update(value => !value);
</script>

<header>
    <ContentArea tag="nav" class="flex items-center justify-between">
        <a href="/">
            <Logo class="h-12" />
        </a>
        <div class="relative block md:hidden">
            <button on:click={onMenuClick}>
                <Icon icon="ic:round-menu" class="size-6" />
            </button>
            <MobileMenu
                onClose={onMenuClick}
                class={$mobileMenuOpen ? "block" : "hidden"}
                {routes}
                {currentRoute} />
        </div>
        <div class="hidden md:block">
            <ol class="flex">
                {#each routesInNav as route}
                    {@const children = routes.filter(
                        r => r.path.startsWith(route.path) && r.path !== route.path,
                    )}
                    <li
                        class={classNames(
                            "hover:text-accent group/nav-item relative transition-colors",
                            $currentRoute?.path.startsWith(route.path)
                                ? "text-accent"
                                : "text-gray-900 dark:text-white",
                        )}>
                        <a href={route.path} class="px-3 py-1 text-sm/6 font-semibold"
                            >{route.name}
                            {#if children.length}
                                <Icon icon="carbon:chevron-down" class="inline size-4" />
                            {/if}
                        </a>
                        {#if children.length}
                            <PopupNav
                                class="invisible translate-y-2 opacity-0 transition-all duration-300 group-hover/nav-item:visible group-hover/nav-item:translate-y-0 group-hover/nav-item:opacity-100"
                                routes={children}
                                {currentRoute} />
                        {/if}
                    </li>
                {/each}
            </ol>
        </div>
    </ContentArea>
</header>
