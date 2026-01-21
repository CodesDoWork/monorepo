<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        children?: Snippet;
        padding?: boolean;
        class?: string;
    }

    const { children, padding, class: className }: Props = $props();
</script>

<div
    class={clsx(
        `
            group/card relative rounded-md bg-white/40 shadow-md transition-all
            hover:scale-101 hover:bg-white/50 hover:shadow-lg
            dark:bg-white/10 dark:text-white
            dark:hover:bg-white/20
        `,
        padding && `p-4`,
        className,
    )}>
    {@render children?.()}
</div>
