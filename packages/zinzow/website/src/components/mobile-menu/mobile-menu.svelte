<script lang="ts">
    import type { RouteFragment } from "../../graphql/default/generated/graphql";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { writable } from "svelte/store";

    interface Props {
        class?: string;
        onClose: () => void;
        routes?: RouteFragment[];
        currentRoute?: RouteFragment;
    }

    const { class: className = "", onClose, routes = [], currentRoute }: Props = $props();

    const routesInNav = $derived(routes.filter(r => r.showInHeader));
    const routeStates = $derived(writable(routes.map(() => false)));
    const toggleRoute = (idx: number) => () => {
        routeStates.update(states => {
            states[idx] = !states[idx];
            return states;
        });
    };

    const backdropAnimation = writable("animate-backdrop");
    const menuAnimation = writable("animate-flyInRight");
    const triggerClose = () => {
        backdropAnimation.set("animate-backdropReverse");
        menuAnimation.set("animate-flyOutRight");
        setTimeout(() => {
            onClose();
            backdropAnimation.set("animate-backdrop");
            menuAnimation.set("animate-flyInRight");
        }, 200);
    };
</script>

<div class={clsx(className)} role="dialog" aria-modal="true">
    <div class={clsx($backdropAnimation, "fixed inset-0 z-10")} onclick={triggerClose} role="none">
    </div>
    <div
        class={clsx(
            $menuAnimation,
            `
                fixed inset-y-0 right-0 z-10 min-w-56 overflow-y-auto bg-(--primary) p-6
                text-(--onPrimary) shadow-lg
                sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
                dark:bg-(--primary-800)
            `,
        )}>
        <div class="mt-2 flex justify-end">
            <button onclick={triggerClose} type="button" class="-m-2.5 rounded-md p-2.5">
                <Icon icon="material-symbols:close" class="size-6" />
            </button>
        </div>
        <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
                <div class="py-6">
                    {#each routesInNav as route, idx (idx)}
                        {@const children = routes.filter(
                            r => r.path.startsWith(route.path) && r.path !== route.path,
                        )}
                        <div
                            class={clsx(
                                currentRoute?.path.startsWith(route.path) && `text-(--primary-200)`,
                                `
                                    -mx-3 flex items-center justify-between rounded-lg px-3 py-2
                                    text-base/7 font-semibold
                                    hover:bg-(--primary-400)
                                    dark:hover:bg-(--primary-700)
                                `,
                            )}>
                            <a class="flex-1" onclick={triggerClose} href={route.path}>
                                {route.name}
                            </a>
                            {#if children.length}
                                <button class="p-1" onclick={toggleRoute(idx)}>
                                    <Icon
                                        icon="carbon:chevron-up"
                                        class={clsx(
                                            "size-4 text-current transition",
                                            $routeStates[idx] ? "rotate-0" : `rotate-180`,
                                        )} /></button>
                            {/if}
                        </div>
                        {#if $routeStates[idx]}
                            <ul>
                                {#each children as child}
                                    <li
                                        class={clsx(
                                            currentRoute?.path.startsWith(child.path)
                                                ? "text-(--primary-200)"
                                                : "",
                                            `
                                                flex items-center justify-between rounded-lg py-2
                                                pr-3 pl-6 text-sm/7 font-semibold
                                                hover:bg-(--primary-400)
                                                dark:hover:bg-(--primary-700)
                                            `,
                                        )}>
                                        <a class="flex-1" onclick={triggerClose} href={child.path}>
                                            {child.name}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
