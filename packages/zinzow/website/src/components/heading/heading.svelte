<script lang="ts">
    import classNames from "classnames";

    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    interface Props {
        tag: HeadingTag;
        class?: string;
        children?: import('svelte').Snippet;
    }

    let { tag, class: className = "", children }: Props = $props();
    
</script>

<svelte:element
    this={tag}
    class={classNames(
        "text-primary dark:text-primary text-pretty font-semibold tracking-tight",
        className,
    )}>
    {@render children?.()}
</svelte:element>
