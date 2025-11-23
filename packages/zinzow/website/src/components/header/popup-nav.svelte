<script lang="ts">
    import type { RouteFragment } from "../../graphql/default/generated/graphql";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        routes?: RouteFragment[];
        currentRoute: RouteFragment;
    }

    const { class: className = "", routes = [], currentRoute }: Props = $props();
</script>

<div class={clsx("absolute top-full -left-8 z-10 w-screen max-w-md", className)}>
    <div
        class="
            mt-3 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5
            dark:bg-(--primary-900)
        ">
        <div class="p-4">
            {#each routes as route}
                {@const isActive = currentRoute.path.startsWith(route.path)}
                <div
                    class="
                        group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6
                        transition-all
                        hover:bg-gray-50
                        dark:hover:bg-(--primary-950)
                    ">
                    <div
                        class="
                            dark:group-hover:bg-primary-900
                            flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50
                            group-hover:bg-white
                            dark:bg-(--primary-950)
                        ">
                        <Icon
                            icon={route.icon}
                            class={clsx(
                                `
                                    size-6 transition-colors duration-300
                                    group-hover:text-(--primary)
                                `,
                                isActive ? "text-(--primary)" : "text-gray-600",
                            )} />
                    </div>
                    <div class="flex-auto">
                        <a
                            href={route.path}
                            class={clsx(
                                "block font-semibold",
                                isActive
                                    ? "text-(--primary)"
                                    : `
                                        text-gray-900
                                        dark:text-gray-200
                                    `,
                            )}>
                            {route.name}
                            <span class="absolute inset-0"></span>
                        </a>
                        <p
                            class="
                                mt-1 text-gray-600
                                dark:text-gray-400
                            ">
                            {route.shortDescription}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
