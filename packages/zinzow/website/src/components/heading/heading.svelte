<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    interface Props {
        tag: HeadingTag;
        class?: string;
        children?: Snippet;
    }

    const { tag, class: className = "", children }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={clsx(
        `
            font-semibold tracking-tight text-pretty text-(--primary)
            dark:text-(--primary)
        `,
        className,
    )}>
    {@render children?.()}
</svelte:element>
