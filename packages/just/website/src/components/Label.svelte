<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    
    interface Props {
        class?: string;
        name: string;
        icon?: string | null;
        tag?: string;
    }

    let {
        class: className = "",
        name,
        icon = null,
        tag = "div"
    }: Props = $props();

    const labelClass = clsx(
        "flex items-center gap-1 bg-black bg-opacity-10 p-2 rounded",
        className,
    );
</script>

<svelte:element this={tag} class={labelClass}>
    <span>{name}</span>
    {#if icon}
        <Icon class="h-6 w-6" {icon} />
    {/if}
</svelte:element>
