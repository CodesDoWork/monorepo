<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        tag: keyof HTMLElementTagNameMap;
        class?: string;
        children?: Snippet;
    }

    const { tag, class: className = "", children }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={clsx(
        `
            text-gray-600
            dark:text-gray-300
        `,
        className,
    )}>
    {@render children?.()}
</svelte:element>
