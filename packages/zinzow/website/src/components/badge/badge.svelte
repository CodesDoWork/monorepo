<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        tag: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const { class: className = "", tag, children }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={clsx(className, "rounded-md bg-(--primary) px-2 py-1 text-white shadow")}>
    {@render children?.()}
</svelte:element>
