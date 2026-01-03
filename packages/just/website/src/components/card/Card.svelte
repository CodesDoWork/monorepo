<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        id?: string;
        class?: string;
        style?: string;
        padding?: boolean;
        safeBg?: boolean;
        children?: Snippet;
    }

    const {
        id,
        class: className = "",
        style,
        padding = false,
        safeBg = false,
        children,
    }: Props = $props();

    const cardClass = $derived(
        clsx(
            `
                animate-fadeIn flex rounded-lg bg-gray-100/90 opacity-0 shadow-md outline
                outline-stone-200 transition-all
                hover:shadow-lg
                dark:bg-gray-50/10 dark:outline-0 dark:hover:bg-gray-50/13 dark:hover:outline-0
            `,
            safeBg ? "hover:bg-gray-100/100" : "hover:bg-gray-100/65",
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

<div {id} class={cardClass} {style}>
    {@render children?.()}
</div>
