<script lang="ts">
    import type { RouteFragment } from "../../graphql/default/generated/graphql";
    import type { LayoutData } from "../../routes/$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { animationDelay } from "../../utils/animation-delay";
    import { WidthBox } from "../content-area";
    import { Logo } from "../logo";
    import { MobileMenu } from "../mobile-menu";

    interface Props {
        data: LayoutData;
        currentRoute?: RouteFragment;
    }

    const { data, currentRoute }: Props = $props();

    const { routes } = $derived(data);
    const routesInNav = $derived(routes.filter(r => r.showInHeader));

    let mobileMenuOpen = $state(false);
    const onMenuClick = $derived(() => (mobileMenuOpen = !mobileMenuOpen));

    const animate = $derived((...classes: string[]) =>
        clsx(...classes, "animate-fadeInBT opacity-0"),
    );
    const AnimationPriority = {
        LOGO: 0,
        NAV: 1,
    };
</script>

<header class={currentRoute?.isHero && "absolute inset-x-0"}>
    <WidthBox class="z-10">
        <nav class="flex items-center justify-between py-4">
            <a href="/">
                <Logo
                    class={animate("size-24 md:size-32 rounded")}
                    style={animationDelay(AnimationPriority.LOGO)} />
            </a>
            <div
                class="
                    relative block
                    md:hidden
                ">
                <button onclick={onMenuClick}>
                    <Icon icon="ic:round-menu" class="size-6" />
                </button>
                <MobileMenu
                    onClose={onMenuClick}
                    class={mobileMenuOpen ? "block" : "hidden"}
                    {routes}
                    {currentRoute} />
            </div>
            <div
                class="
                    hidden
                    md:block
                ">
                <ul class="flex">
                    {#each routesInNav as route, idx (idx)}
                        <li
                            style={animationDelay(AnimationPriority.NAV + idx)}
                            class={animate(
                                `
                                group/nav-item relative transition-all
                                hover:scale-105 hover:text-(--primary)
                                dark:hover:text-(--primary-200)
                            `,
                                currentRoute?.path.startsWith(route.path)
                                    ? `
                                    scale-105 text-(--primary)
                                    dark:text-(--primary-200)
                                `
                                    : `
                                    scale-100 text-gray-900
                                    dark:text-white
                                `,
                            )}>
                            <a href={route.path} class={clsx(`block px-3 py-1 font-semibold`)}>
                                {route.name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </nav>
    </WidthBox>
</header>
