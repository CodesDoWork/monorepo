<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        emoji?: string;
        value?: string | number | bigint | null;
        unit?: string;
        color: "primary" | "secondary" | "tertiary" | "accent" | "other";
        selected?: boolean;
    }

    const { emoji, value, unit, color, selected }: Props = $props();

    const classes = $derived.by(() => {
        return clsx({
            "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300":
                color === "primary",
            "bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300":
                color === "secondary",
            "bg-tertiary-50 text-tertiary-700 dark:bg-tertiary-900/30 dark:text-tertiary-300":
                color === "tertiary",
            "bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300":
                color === "accent",
            "bg-stone-100 text-stone-700 dark:bg-stone-950/30 dark:text-stone-300":
                color === "other",
            "bg-primary-600! text-white!": selected,
        });
    });
</script>

<span class={clsx(classes, "rounded-sm px-2 py-1 text-xs font-medium")}>
    {#if emoji}{emoji}&nbsp;{/if}{value ?? 0}{#if unit}&thinsp;{unit}{/if}
</span>
