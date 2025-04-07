<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import AnimatedText from "./AnimatedText.svelte";

    interface Props {
        class?: string;
        id?: string | null;
        level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        commandStyle?: boolean;
        blinkCursor?: boolean;
        animateText?: string;
        children?: Snippet;
    }

    const {
        class: className = "",
        id = null,
        level = "h1",
        commandStyle = true,
        blinkCursor = false,
        animateText = "",
        children,
    }: Props = $props();

    const computedClassName = $derived(
        clsx(
            className,
            "cursor-default font-mono font-bold drop-shadow-sm transition-colors duration-1000",
            commandStyle && "before:mr-2 before:opacity-75 before:content-['>']",
            level === "h1" && "mb-6 mt-4 text-2xl md:mt-6 md:text-3xl lg:mt-8 xl:text-4xl",
            level === "h2" && "mb-5 text-xl md:text-2xl xl:text-3xl",
            level === "h3" && "mb-4 text-lg md:text-xl xl:text-2xl",
            level === "h4" && "mb-3 lg:text-lg xl:text-xl",
            level === "h5" && "mb-2 lg:text-lg",
            level === "h6" && "mb-1 italic",
            "text-[var(--page-color)] dark:text-[var(--page-color)]",
        ),
    );
</script>

<svelte:element this={level} class={computedClassName} {id}>
    {#if animateText}
        <AnimatedText {blinkCursor} text={animateText} />
    {:else}
        {@render children?.()}
    {/if}
</svelte:element>
