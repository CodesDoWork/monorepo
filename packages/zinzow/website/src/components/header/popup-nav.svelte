<script lang="ts">
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import type { Readable } from "svelte/store";
    import type { LayoutData } from "../../routes/$types";

    let className = "";
    export { className as class };

    type Route = LayoutData["routes"][number];
    export let routes: Route[] = [];
    export let currentRoute: Readable<Route | undefined>;
</script>

<div class={classNames("absolute -left-8 top-full z-10 w-screen max-w-md", className)}>
    <div class="dark:bg-primary-900 mt-3 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <div class="p-4">
            {#each routes as route}
                {@const isActive = $currentRoute?.path.startsWith(route.path)}
                <div
                    class="dark:hover:bg-primary-950 group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 transition-all hover:bg-gray-50">
                    <div
                        class="dark:bg-primary-950 dark:group-hover:bg-primary-900 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <Icon
                            icon={route.icon}
                            class={classNames(
                                "group-hover:text-accent size-6 transition-colors duration-300",
                                isActive ? "text-accent" : " text-gray-600",
                            )} />
                    </div>
                    <div class="flex-auto">
                        <a
                            href={route.path}
                            class={classNames(
                                "block font-semibold",
                                isActive ? "text-accent" : "text-gray-900 dark:text-gray-200",
                            )}>
                            {route.name}
                            <span class="absolute inset-0"></span>
                        </a>
                        <p class="mt-1 text-gray-600 dark:text-gray-400">
                            {route.shortDescription}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
