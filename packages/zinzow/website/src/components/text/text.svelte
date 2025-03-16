<script lang="ts">
    import type { Snippet } from "svelte";
    import classNames from "classnames";

    interface Props {
        tag: keyof HTMLElementTagNameMap;
        class?: string;
        children?: Snippet;
    }

    const { tag, class: className = "", children }: Props = $props();

</script>

<svelte:element this={tag} class={classNames("text-gray-600 dark:text-gray-300", className)}>
    {@render children?.()}
</svelte:element>
