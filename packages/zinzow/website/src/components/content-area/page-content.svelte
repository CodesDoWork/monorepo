<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { WidthBox } from ".";

    interface Props {
        class?: string;
        tag?: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<WidthBox class={clsx("py-16", className)}>
    {@render children?.()}
</WidthBox>
