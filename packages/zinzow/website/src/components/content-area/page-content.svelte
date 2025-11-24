<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { WidthBox } from ".";

    interface Props {
        class?: string;
        tag?: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const { class: className = "", tag = "div", children }: Props = $props();
</script>

<WidthBox
    {tag}
    class={clsx(
        `
            py-16
            lg:py-24
        `,
        className,
    )}>
    {@render children?.()}
</WidthBox>
