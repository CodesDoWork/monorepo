<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { commandStyleClasses, stylesMap } from "../../lib/common/styles";
    import AnimatedText from "./AnimatedText.svelte";

    interface Props {
        class?: string;
        id?: string | null;
        commandStyle?: boolean;
        blinkCursor?: boolean;
        animateText?: string;
        children?: Snippet;
    }

    const {
        class: className,
        id = null,
        commandStyle = true,
        blinkCursor = false,
        animateText,
        children,
    }: Props = $props();
</script>

<h5 class={clsx(stylesMap.h5, commandStyle && commandStyleClasses, className)} {id}>
    {#if animateText}
        <AnimatedText {blinkCursor} text={animateText} />
    {:else}
        {@render children?.()}
    {/if}
</h5>
