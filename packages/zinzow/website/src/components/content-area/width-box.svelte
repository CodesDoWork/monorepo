<script lang="ts">
    import classNames from "classnames";

    
    interface Props {
        class?: string;
        tag?: keyof HTMLElementTagNameMap;
        children?: import('svelte').Snippet;
    }

    let { class: className = "", tag = "div", children }: Props = $props();
</script>

<svelte:element this={tag} class={classNames("relative mx-auto max-w-7xl p-6 lg:px-8", className)}>
    {@render children?.()}
</svelte:element>
