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
            "bg-gray-50 bg-opacity-90 dark:bg-opacity-10 dark:hover:bg-opacity-15",
            safeBg ? "hover:bg-opacity-100" : "hover:bg-opacity-40",
            "rounded-lg transition-all",
            "shadow-md hover:shadow-lg",
            "animate-fadeIn opacity-0",
            "outline outline-1 outline-stone-200 dark:outline-0 dark:hover:outline-0",
            padding && "p-4 sm:p-5 md:p-6",
            className,
        ),
    );
</script>

<svelte:element this={tag} {id} class={cardClass} {style}>
    {@render children?.()}
</svelte:element>
