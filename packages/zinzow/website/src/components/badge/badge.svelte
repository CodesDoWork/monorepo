<script lang="ts">
    import classNames from "classnames";

    let className = "";
    export { className as class };
    export let tag: keyof HTMLElementTagNameMap;
</script>

<svelte:element
    this={tag}
    class={classNames(className, "bg-primary rounded-md px-2 py-1 text-white shadow")}>
    <slot />
</svelte:element>
