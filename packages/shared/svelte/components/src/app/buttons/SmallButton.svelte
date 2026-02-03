<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { clsx } from "clsx";

    interface Props extends HTMLButtonAttributes {
        color?: "primary" | "secondary" | "tertiary" | "accent" | "other";
        children?: Snippet;
    }

    const { class: className, color = "primary", children, ...rest }: Props = $props();
</script>

<button
    {...rest}
    class={clsx(
        className,
        "cursor-pointer rounded-sm px-2 py-1 text-xs",
        color === "primary" && "bg-primary-600 text-white",
        color === "secondary" && "bg-secondary-600 text-white",
        color === "tertiary" && "bg-tertiary-600 text-white",
        color === "accent" && "bg-accent-600 text-white",
        color === "other" &&
            `
                bg-gray-100
                dark:bg-gray-700
            `,
    )}>
    {@render children?.()}
</button>
