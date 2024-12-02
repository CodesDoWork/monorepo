<script lang="ts">
    import { Logo } from "../components/logo";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { heroImage, routes, currentRoute } = data;
    const firstRoutes = routes.filter(r => r.showInHeader);

    const stats = [
        { value: "12", info: "Offices worldwide" },
        { value: "300+", info: "Full-time colleagues" },
        { value: "40", info: "Hours per week" },
        { value: "Unlimited", info: "Paid time off" },
    ];
</script>

<div class="relative isolate min-h-screen w-screen overflow-hidden bg-gray-900 py-24 sm:py-32">
    <img
        src={heroImage}
        alt=""
        class="absolute inset-0 -z-20 size-full object-cover object-center blur" />
    <div class="absolute inset-0 -z-10 bg-white opacity-35 dark:bg-black dark:opacity-75"></div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <a class="inline-block" href="/">
                <Logo class="h-20 drop-shadow-lg sm:h-24 md:h-28 lg:h-32" />
            </a>
            <p
                class="mt-8 text-pretty text-lg font-medium text-gray-800 sm:text-xl/8 dark:text-gray-300">
                {$currentRoute.welcomeText}
            </p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <ol
                class="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-black sm:grid-cols-2 md:flex lg:gap-x-10 dark:text-white">
                {#each firstRoutes as route}
                    <li>
                        <a
                            class="hover:text-primary dark:hover:text-accent p-1 drop-shadow transition-all hover:drop-shadow-md"
                            href={route.path}>
                            {route.name}&nbsp;<span aria-hidden="true">&rarr;</span>
                        </a>
                    </li>
                {/each}
            </ol>
            <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {#each stats as stat}
                    <div class="flex flex-col-reverse gap-1">
                        <dt class="text-base/7 text-gray-800 dark:text-gray-300">{stat.info}</dt>
                        <dd
                            class="text-primary-700 text-4xl font-semibold tracking-tight dark:text-white">
                            {stat.value}
                        </dd>
                    </div>
                {/each}
            </dl>
        </div>
    </div>
</div>
