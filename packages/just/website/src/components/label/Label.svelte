<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        name: string;
        icon?: string | null;
        highlighted?: boolean;
    }

    const { class: className = "", name, icon = null, highlighted }: Props = $props();

    const labelClass = $derived(
        clsx(
            "flex items-center gap-1 rounded p-2",
            highlighted
                ? `
                    bg-primary-400/30
                    dark:bg-primary-600/30
                `
                : "bg-black/10",
            className,
        ),
    );
</script>

<div class={labelClass}>
    <span>{name}</span>
    {#if icon}
        <Icon class="h-6 w-6" {icon} />
    {/if}
</div>
