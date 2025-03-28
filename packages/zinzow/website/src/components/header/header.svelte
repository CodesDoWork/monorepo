<script lang="ts">
    import type { LayoutData } from "../../routes/$types";
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import { writable } from "svelte/store";
    import { WidthBox } from "../content-area";
    import { Logo } from "../logo";
    import { MobileMenu } from "../mobile-menu";
    import PopupNav from "./popup-nav.svelte";

    interface Props {
        data: LayoutData;
    }

    const { data }: Props = $props();

    const { routes, currentRoute } = data;
    const routesInNav = routes.filter(r => r.showInHeader);

    const mobileMenuOpen = writable(false);
    const onMenuClick = () => mobileMenuOpen.update(value => !value);
</script>

<header>
    <WidthBox tag="nav" class="flex items-center justify-between">
        <a href="/">
            <Logo class="h-16" />
        </a>
        <div class="relative block md:hidden">
            <button onclick={onMenuClick}>
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
                        <a
                            href={route.path}
                            class="block px-3 py-1 text-sm/6 font-semibold transition group-hover/nav-item:scale-110">
                            {route.name}
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
    </WidthBox>
</header>
