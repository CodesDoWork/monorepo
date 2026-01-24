<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { clsx } from "clsx";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        class?: string;
        children?: Snippet;
    }

    const { class: className, children, ...rest }: Props = $props();

    const layoutClass = clsx(
        `
            bg-primary-400 from-primary-400 to-secondary-400
            dark:bg-primary-950 dark:from-primary-950 dark:to-secondary-950
            min-h-screen bg-linear-to-b from-5% to-95% transition-colors
            dark:text-gray-200
        `,
    );
    $effect(() => {
        document.body.className = layoutClass;
    });
</script>

<div class={clsx(layoutClass, className)} {...rest}>
    {@render children?.()}
</div>
