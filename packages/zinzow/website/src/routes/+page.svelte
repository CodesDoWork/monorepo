<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import clsx from "clsx";
    import { writable } from "svelte/store";
    import { fly } from "svelte/transition";
    import { MobileMenu } from "../components/mobile-menu";
    import { animationDelay } from "../utils/animation-delay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { heroImages, logo, routes, currentRoute, texts } = data;
    const firstRoutes = routes.filter(r => r.showInHeader);

    let currentHeroImageIdx = $state(0);
    const cycleTime = 5000;
    function cycleHeroImage() {
        currentHeroImageIdx = (currentHeroImageIdx + 1) % heroImages.length;
        setTimeout(cycleHeroImage, cycleTime);
    }
    setTimeout(cycleHeroImage, cycleTime);

    const AnimationPriority = {
        LOGO: 0,
        WELCOME_TEXT: 1,
        NAV: 2,
    };

    const mobileMenuOpen = writable(false);
    const onMenuClick = () => mobileMenuOpen.update(value => !value);

    const getClasses = (...classes: string[]) =>
        classNames(...classes, "opacity-0 animate-fadeInBT");
</script>

<div
    class="relative isolate md:min-h-0 md:h-screen md:max-h-[60rem] w-screen overflow-hidden py-6 grid">
    <div
        class={clsx(
            "mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16",
            "grid items-center",
            "grid-cols-[6rem_auto_min-content] md:grid-cols-1",
            "grid-rows-[min-content_auto_min-content] gap-x-4 gap-y-6 md:grid-rows-[auto_auto_auto] md:gap-0",
        )}>
        <img src={logo} alt="logo" class="md:hidden size-24 rounded" />
        <p
            style={animationDelay(AnimationPriority.WELCOME_TEXT)}
            class={getClasses(
                "md:hidden text-lg font-medium text-gray-800 sm:text-xl dark:text-gray-300",
            )}>
            {texts.intro}
        </p>
        <nav class="md:place-self-center">
            <ol
                class="hidden gap-x-8 gap-y-6 text-base/7 font-semibold text-black md:flex lg:gap-x-10 dark:text-white">
                {#each firstRoutes as route, idx (idx)}
                    <li style={animationDelay(AnimationPriority.NAV + idx)} class={getClasses()}>
                        <a
                            class="hover:text-primary dark:hover:text-accent block p-1 drop-shadow transition-all hover:scale-105 hover:drop-shadow-md"
                            href={route.path}>
                            {route.name}
                        </a>
                    </li>
                {/each}
            </ol>
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
        </nav>

        <div class="animate-fadeIn w-full col-span-3 flex justify-center">
            <div
                class="grid md:grid-cols-2 overflow-hidden w-full md:w-auto max-h-[60vh] md:h-auto h-[60vh] min-h-72 rounded-lg shadow-md"
                style={animationDelay(AnimationPriority.LOGO)}>
                <div class="relative">
                    {#key currentHeroImageIdx}
                        <img
                            in:fly={{ x: "100%", opacity: 1 }}
                            out:fly={{ x: "-100%", opacity: 1 }}
                            src={heroImages[currentHeroImageIdx]}
                            alt="hero"
                            class="absolute size-full object-cover" />
                    {/key}
                </div>
                <img
                    src={logo}
                    alt="Logo"
                    class="w-auto max-h-[55vh] rounded-tr-lg rounded-br-lg z-10 object-contain hidden md:block" />
            </div>
        </div>

        <p
            style={animationDelay(AnimationPriority.WELCOME_TEXT)}
            class={getClasses(
                "hidden md:block col-span-2 max-w-2xl place-self-center text-lg font-medium text-gray-800 sm:text-xl md:text-2xl dark:text-gray-300 pb-8",
            )}>
            {texts.intro}
        </p>
    </div>
</div>
