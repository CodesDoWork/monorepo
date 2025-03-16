<script lang="ts">
    import { clsx } from "clsx";
    import AnimatedText from "./AnimatedText.svelte";

    
    interface Props {
        class?: string;
        id?: string | null;
        level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        commandStyle?: boolean;
        blinkCursor?: boolean;
        animateText?: string;
        children?: import('svelte').Snippet;
    }

    let {
        class: className = "",
        id = null,
        level = "h1",
        commandStyle = true,
        blinkCursor = false,
        animateText = "",
        children
    }: Props = $props();

    let computedClassName = $derived(clsx(
        "font-mono font-bold transition-colors drop-shadow-sm cursor-default",
        commandStyle && "before:content-['>'] before:mr-2 before:opacity-75",
        level === "h1" && "text-2xl md:text-3xl xl:text-4xl mb-6 mt-4 md:mt-6 lg:mt-8",
        level === "h2" && "text-xl md:text-2xl xl:text-3xl mb-5",
        level === "h3" && "text-lg md:text-xl xl:text-2xl mb-4",
        level === "h4" && "lg:text-lg xl:text-xl mb-3",
        level === "h5" && "lg:text-lg mb-2",
        level === "h6" && "italic mb-1",
        "text-[var(--page-color)] dark:text-[var(--page-color)]",
        className,
    ));
</script>

<svelte:element this={level} class={computedClassName} {id}>
    {#if animateText}
        <AnimatedText {blinkCursor} text={animateText} />
    {:else}
        {@render children?.()}
    {/if}
</svelte:element>
