<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        name: string;
        icon?: string | null;
        tag?: string;
        highlighted?: boolean;
    }

    const { class: className = "", name, icon = null, tag = "div", highlighted }: Props = $props();

    const labelClass = clsx(
        "flex items-center gap-1 rounded p-2",
        highlighted ? "bg-primary-400/30 dark:bg-primary-600/30" : "bg-black/10",
        className,
    );
</script>

<svelte:element this={tag} class={labelClass}>
    <span>{name}</span>
    {#if icon}
        <Icon class="h-6 w-6" {icon} />
    {/if}
</svelte:element>
