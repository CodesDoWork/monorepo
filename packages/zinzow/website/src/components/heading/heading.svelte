<script lang="ts">
    import classNames from "classnames";

    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    export let tag: HeadingTag;

    let className = "";
    export { className as class };
</script>

<svelte:element
    this={tag}
    class={classNames(
        "text-primary dark:text-primary text-pretty font-semibold tracking-tight",
        className,
    )}>
    <slot />
</svelte:element>
