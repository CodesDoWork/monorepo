<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import { writable } from "svelte/store";
    import { Logo } from "../components/logo";
    import { MobileMenu } from "../components/mobile-menu";
    import { animationDelay } from "../utils/animation-delay";

    export let data: PageData;
    const { heroImage, routes, currentRoute } = data;
    const firstRoutes = routes.filter(r => r.showInHeader);

    const stats = [
        { value: "12", info: "Offices worldwide" },
        { value: "300+", info: "Full-time colleagues" },
        { value: "40", info: "Hours per week" },
        { value: "Unlimited", info: "Paid time off" },
    ];

    const AnimationPriority = {
        LOGO: 0,
        WELCOME_TEXT: 1,
        NAV: 2,
        STATS: 3,
    };

    const mobileMenuOpen = writable(false);
    const onMenuClick = () => mobileMenuOpen.update(value => !value);

    const getClasses = (...classes: string[]) => classNames(...classes, "opacity-0 animate-fadeInBT");
</script>

<div
    class="relative isolate min-h-screen w-screen overflow-hidden bg-gray-900 pb-24 pt-12 sm:py-16">
    <img
        src={heroImage}
        alt=""
        class="animate-fadeIn absolute inset-0 -z-20 size-full object-cover object-center blur" />
    <div class="absolute inset-0 -z-10 bg-white opacity-35 dark:bg-black dark:opacity-75"></div>
    <div class="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8">
        <nav class="place mb-8 self-end md:mb-24 md:self-center">
            <ol
                class="hidden gap-x-8 gap-y-6 text-base/7 font-semibold text-black md:flex lg:gap-x-10 dark:text-white">
                {#each firstRoutes as route, idx (idx)}
                    <li style={animationDelay(AnimationPriority.NAV + idx)} class={getClasses()}>
                        <a
                            class="hover:text-primary dark:hover:text-accent block p-1 drop-shadow transition-all hover:scale-105 hover:drop-shadow-md"
                            href={route.path}>
                            {route.name}&nbsp;<span aria-hidden="true">&rarr;</span>
                        </a>
                    </li>
                {/each}
            </ol>
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
        </nav>

        <a
            class={getClasses("inline-block")}
            href="/"
            style={animationDelay(AnimationPriority.LOGO)}>
            <Logo class="h-20 drop-shadow-lg sm:h-24 md:h-28 lg:h-32" />
        </a>
        <p
            style={animationDelay(AnimationPriority.WELCOME_TEXT)}
            class={getClasses(
                "mt-8 max-w-2xl text-pretty text-center text-lg font-medium text-gray-800 sm:text-xl/8 md:mt-12 dark:text-gray-300",
            )}>
            {$currentRoute.welcomeText}
        </p>
        <div class="mt-8 max-w-2xl md:mt-12 lg:max-w-none">
            <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {#each stats as stat, idx (idx)}
                    <div
                        class={getClasses("flex flex-col-reverse gap-1")}
                        style={animationDelay(AnimationPriority.STATS + idx + firstRoutes.length)}>
                        <dt
                            class="text-center text-base/7 text-gray-800 md:text-left dark:text-gray-300">
                            {stat.info}
                        </dt>
                        <dd
                            class="text-primary-700 text-center text-4xl font-semibold tracking-tight md:text-left dark:text-white">
                            {stat.value}
                        </dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</div>
