<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props extends HTMLButtonAttributes {
        icon?: string;
        iconClass?: string;
        iconOnlyWhenSmall?: boolean;
        mode?: "normal" | "primary" | "danger";
        children?: Snippet;
    }

    const {
        class: className,
        icon,
        iconClass = clsx("size-4"),
        iconOnlyWhenSmall,
        mode = "normal",
        children,
        ...rest
    }: Props = $props();
</script>

<button
    {...rest}
    class={clsx(
        className,
        `
            flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
            whitespace-nowrap transition-colors
            disabled:cursor-not-allowed disabled:opacity-50
        `,
        mode === "normal" &&
            `
                border border-gray-300 bg-gray-100
                hover:bg-gray-200
                dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
                dark:hover:bg-gray-700
            `,
        mode === "primary" &&
            `
                bg-primary-600
                hover:bg-primary-700
                dark:bg-primary-700
                dark:hover:bg-primary-600
                text-white
            `,
        mode === "danger" &&
            `
                border border-red-200 bg-red-100 text-red-700
                hover:bg-red-200
                dark:border-red-900 dark:bg-red-900/30 dark:text-red-400
                dark:hover:bg-red-900
            `,
    )}>
    {#if icon}
        <Icon {icon} class={iconClass} />
    {/if}
    <span
        class={clsx(
            iconOnlyWhenSmall &&
                `
                    hidden
                    sm:inline
                `,
        )}>
        {@render children?.()}
    </span>
</button>
