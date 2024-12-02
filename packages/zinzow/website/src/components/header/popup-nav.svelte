<script lang="ts">
    import Icon from "@iconify/svelte";
    import classNames from "classnames";

    let className = "";
    export { className as class };

    type Route = {
        name: string;
        path: string;
        icon?: string;
        shortDescription?: string;
    };
    export let routes: Route[];
</script>

<div class={classNames("absolute -left-8 top-full z-10 w-screen max-w-md", className)}>
    <div class="dark:bg-primary-900 mt-3 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <div class="p-4">
            {#each routes as route}
                <div
                    class="dark:hover:bg-primary-950 group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 transition-all hover:bg-gray-50">
                    <div
                        class="dark:bg-primary-950 dark:group-hover:bg-primary-900 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <Icon
                            icon={route.icon}
                            class="group-hover:text-accent size-6 text-gray-600 transition-colors duration-300" />
                    </div>
                    <div class="flex-auto">
                        <a
                            href={route.path}
                            class="block font-semibold text-gray-900 dark:text-gray-200">
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
