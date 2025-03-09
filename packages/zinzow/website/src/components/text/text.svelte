<script lang="ts">
    import classNames from "classnames";

    export let tag: keyof HTMLElementTagNameMap;

    let className = "";
    export { className as class };
</script>

<svelte:element this={tag} class={classNames("text-gray-600 dark:text-gray-300", className)}>
    <slot />
</svelte:element>
