<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
    export let commandStyle = true;
    export let blinkCursor = false;
    export let animateText = "";

    let typedText = "";
    let animationDone = !animateText;

    if (animateText) {
        let nextTypeIndex = 0
        const typeText = () => {
            if (nextTypeIndex < animateText.length) {
                typedText = animateText.slice(0, ++nextTypeIndex);
                setTimeout(typeText, 50);
            } else {
                typedText = typedText.trim();
                animationDone = true;
            }
        };

        setTimeout(typeText, 50);
    }


    $: computedClassName = clsx([
        "font-mono font-bold cursor-default",
        commandStyle && "before:content-['>'] before:mr-2 before:opacity-75",
        blinkCursor && "after:content-['▌'] after:ml-2",
        animationDone && "after:animate-blink",
        className,
    ]);
</script>

<svelte:element class={computedClassName} this={level}>
    {#if animateText}
        {typedText}
    {:else}
        <slot />
    {/if}
</svelte:element>
