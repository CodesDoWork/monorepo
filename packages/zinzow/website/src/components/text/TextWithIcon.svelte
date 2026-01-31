<script lang="ts">
    import type { Snippet } from "svelte";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { smoothScrollOnClick } from "@cdw/monorepo/shared-utils/html/client";
    import { clsx } from "clsx";
    import { fadeInBottom } from "../../lib/common/styles";
    import TextWithIconContent from "./TextWithIconContent.svelte";

    interface Props {
        class?: string;
        iconContainerClass?: string;
        icon: string;
        href?: string | null;
        small?: boolean;
        children?: Snippet;
        animationDelay?: number;
    }

    const {
        class: className,
        iconContainerClass,
        icon,
        href = null,
        small,
        children,
        animationDelay: delay,
    }: Props = $props();

    const style = $derived(delay ? animationDelay(delay) : undefined);
    const elementClass = $derived(clsx(className, delay && fadeInBottom, "group flex w-fit gap-2"));
</script>

{#if href}
    <a
        {href}
        onclick={smoothScrollOnClick}
        role={href ? "link" : "none"}
        {style}
        class={elementClass}>
        <TextWithIconContent {href} class={iconContainerClass} {icon} {small}>
            {@render children?.()}
        </TextWithIconContent>
    </a>
{:else}
    <div {style} class={elementClass}>
        <TextWithIconContent {href} class={iconContainerClass} {icon} {small}>
            {@render children?.()}
        </TextWithIconContent>
    </div>
{/if}
