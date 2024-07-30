<script lang="ts">
    import { clsx } from "clsx";
    import AnimatedText from "./AnimatedText.svelte";

    let className = "";
    export { className as class };
    export let id: string | undefined = undefined;
    export let level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
    export let commandStyle = true;
    export let blinkCursor = false;
    export let animateText = "";

    let animationDone = !animateText;
    const onAnimationDone = () => {
        animationDone = true;
    };

    $: computedClassName = clsx(
        "font-mono font-bold transition-colors drop-shadow-sm cursor-default",
        commandStyle && "before:content-['>'] before:mr-2 before:opacity-75",
        blinkCursor && "after:content-['▌'] after:ml-2",
        animationDone && "after:animate-blink",
        level === "h1" && "text-2xl md:text-3xl xl:text-4xl mb-6 mt-4 md:mt-6 lg:mt-8",
        level === "h2" && "text-xl md:text-2xl xl:text-3xl mb-5",
        level === "h3" && "text-lg md:text-xl xl:text-2xl mb-4",
        level === "h4" && "lg:text-lg xl:text-xl mb-3",
        level === "h5" && "lg:text-lg mb-2",
        level === "h6" && "italic mb-1",
        "text-[var(--page-color)] dark:text-[var(--page-color)]",
        className,
    );
</script>

<svelte:element class={computedClassName} id={id} this={level}>
    {#if animateText}
        <AnimatedText text={animateText} {onAnimationDone} />
    {:else}
        <slot />
    {/if}
</svelte:element>
