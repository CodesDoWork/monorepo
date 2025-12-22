<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { animationDelay, fadeInBottom } from "../../lib/client/animate";
    import { smoothScrollOnClick } from "../../utils/smoothScrollOnClick";
    import TextWithIconContent from "./TextWithIconContent.svelte";

    interface Props {
        class?: string;
        iconContainerClass?: string;
        icon: string;
        href?: string | null;
        children?: Snippet;
        animationDelay?: number;
    }

    const {
        class: className,
        iconContainerClass,
        icon,
        href = null,
        children,
        animationDelay: delay,
    }: Props = $props();

    const style = $derived(delay ? animationDelay(delay) : undefined);
    const elementClass = $derived(
        clsx(className, delay && fadeInBottom(), "group flex w-fit gap-2"),
    );
</script>

{#if href}
    <a
        {href}
        onclick={smoothScrollOnClick}
        role={href ? "link" : "none"}
        {style}
        class={elementClass}>
        <TextWithIconContent {href} class={iconContainerClass} {icon}>
            {@render children?.()}
        </TextWithIconContent>
    </a>
{:else}
    <div {style} class={elementClass}>
        <TextWithIconContent {href} class={iconContainerClass} {icon}>
            {@render children?.()}
        </TextWithIconContent>
    </div>
{/if}
