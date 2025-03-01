<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let name: string;
    export let icon: string | null = null;
    export let tag: string = "div";

    const labelClass = clsx(
        "flex items-center gap-1 bg-black bg-opacity-10 p-2 rounded",
        className,
    );
</script>

<svelte:element class={labelClass} this={tag}>
    <span>{name}</span>
    {#if icon}
        <Icon class="w-6 h-6" icon={icon} />
    {/if}
</svelte:element>
