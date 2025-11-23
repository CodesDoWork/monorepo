<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        id?: string;
        class?: string;
        style?: string;
        padding?: boolean;
        safeBg?: boolean;
        tag?: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const {
        id,
        class: className = "",
        style,
        padding = false,
        safeBg = false,
        children,
        tag = "div",
    }: Props = $props();

    const cardClass = $derived(
        clsx(
            "flex",
            `
                bg-gray-50/90
                dark:bg-gray-50/10 dark:hover:bg-gray-50/15
            `,
            safeBg ? "hover:bg-gray-50/100" : "hover:bg-gray-50/40",
            "rounded-lg transition-all",
            `
                shadow-md
                hover:shadow-lg
            `,
            "animate-fadeIn opacity-0",
            `
                outline outline-stone-200
                dark:outline-0 dark:hover:outline-0
            `,
            padding &&
                `
                    p-4
                    sm:p-5
                    md:p-6
                `,
            className,
        ),
    );
</script>

<svelte:element this={tag} {id} class={cardClass} {style}>
    {@render children?.()}
</svelte:element>
