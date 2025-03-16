<script lang="ts">
    import type { Snippet } from "svelte";
    import classNames from "classnames";

    interface Props {
        class?: string;
        tag: keyof HTMLElementTagNameMap;
        children?: Snippet;
    }

    const { class: className = "", tag, children }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={classNames(className, "bg-primary rounded-md px-2 py-1 text-white shadow")}>
    {@render children?.()}
</svelte:element>
