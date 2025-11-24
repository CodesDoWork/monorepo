<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        tag?: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const { class: className = "", tag = "div", children }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={clsx(
        `
            relative mx-auto max-w-7xl p-6
            lg:px-8
        `,
        className,
    )}>
    {@render children?.()}
</svelte:element>
