<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { smoothScrollOnClick } from "../../utils/smoothScrollOnClick";
    import TextWithIconContent from "./TextWithIconContent.svelte";

    interface Props {
        class?: string;
        iconContainerClass?: string;
        icon: string;
        href?: string | null;
        children?: Snippet;
    }

    const { class: className, iconContainerClass, icon, href = null, children }: Props = $props();
</script>

{#if href}
    <a
        {href}
        onclick={smoothScrollOnClick}
        role={href ? "link" : "none"}
        class={clsx(className, "group flex w-fit gap-2")}>
        <TextWithIconContent {href} class={iconContainerClass} {icon}>
            {@render children?.()}
        </TextWithIconContent>
    </a>
{:else}
    <div class={clsx(className, "group flex w-fit gap-2")}>
        <TextWithIconContent {href} class={iconContainerClass} {icon}>
            {@render children?.()}
        </TextWithIconContent>
    </div>
{/if}
