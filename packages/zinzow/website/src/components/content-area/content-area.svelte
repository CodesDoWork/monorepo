<script lang="ts">
    import classNames from "classnames";

    let className = "";
    export { className as class };
    export let tag: keyof HTMLElementTagNameMap = "div";
</script>

<svelte:element this={tag} class={classNames("relative mx-auto max-w-7xl p-6 lg:px-8", className)}>
    <slot />
</svelte:element>
